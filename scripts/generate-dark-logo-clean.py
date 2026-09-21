#!/usr/bin/env python3
"""Generate clean semantic cream/gold masks for the reversed navbar logo.

The source canvas and artwork placement remain unchanged. JPEG color variation
is used only to locate the original shapes; output colors and antialiasing are
rebuilt deterministically from cleaned binary masks.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


CREAM = (0xF3, 0xE9, 0xCF)
SUPERSAMPLE_SCALE = 4


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    return parser.parse_args()


def remove_small_components(mask: np.ndarray, minimum_area: int) -> np.ndarray:
    labels, count = ndimage.label(mask, structure=np.ones((3, 3), dtype=bool))
    if count == 0:
        return mask

    component_sizes = np.bincount(labels.ravel())
    keep = component_sizes >= minimum_area
    keep[0] = False
    return keep[labels]


def fill_small_holes(mask: np.ndarray, maximum_area: int) -> np.ndarray:
    inverse_labels, count = ndimage.label(
        ~mask, structure=np.ones((3, 3), dtype=bool)
    )
    if count == 0:
        return mask

    border_labels = np.unique(
        np.concatenate(
            (
                inverse_labels[0, :],
                inverse_labels[-1, :],
                inverse_labels[:, 0],
                inverse_labels[:, -1],
            )
        )
    )
    component_sizes = np.bincount(inverse_labels.ravel())
    fill = component_sizes <= maximum_area
    fill[border_labels] = False
    fill[0] = False
    return mask | fill[inverse_labels]


def clean_mask(mask: np.ndarray, minimum_area: int) -> np.ndarray:
    cleaned = remove_small_components(mask, minimum_area)
    cleaned = ndimage.binary_closing(cleaned, structure=np.ones((3, 3)))
    cleaned = fill_small_holes(cleaned, maximum_area=16)
    return cleaned


def build_semantic_masks(source: Image.Image) -> tuple[np.ndarray, np.ndarray]:
    denoised = source.filter(ImageFilter.MedianFilter(3))
    pixels = np.asarray(denoised, dtype=np.float32)
    red, green, blue = np.moveaxis(pixels, -1, 0)
    maximum = pixels.max(axis=2)
    minimum = pixels.min(axis=2)
    saturation = (maximum - minimum) / np.maximum(maximum, 1)
    distance_from_background = 254 - minimum

    gold_seed = (
        (red > green + 18)
        & (green > blue + 28)
        & (saturation > 0.28)
        & (distance_from_background > 45)
    )
    gold_candidate = (
        (red > green + 3)
        & (green > blue + 7)
        & (saturation > 0.10)
        & (distance_from_background > 12)
    )
    gold_support = ndimage.binary_dilation(gold_seed, iterations=5)
    gold_mask = clean_mask(gold_candidate & gold_support, minimum_area=80)

    green_seed = (
        (green > red + 12)
        & (green > blue + 5)
        & (saturation > 0.18)
        & (distance_from_background > 45)
    )
    green_support = ndimage.binary_dilation(green_seed, iterations=5)
    non_background = distance_from_background > 14
    cream_candidate = non_background & ~gold_candidate
    cream_mask = clean_mask(cream_candidate & green_support, minimum_area=80)

    # Gold is a separate semantic layer and wins only where an intended gold
    # component survived the confident-seed and component-area checks.
    cream_mask &= ~gold_mask
    return cream_mask, gold_mask


def antialiased_mask(mask: np.ndarray) -> Image.Image:
    binary = Image.fromarray(np.where(mask, 255, 0).astype(np.uint8))
    high_resolution = binary.resize(
        (
            binary.width * SUPERSAMPLE_SCALE,
            binary.height * SUPERSAMPLE_SCALE,
        ),
        Image.Resampling.NEAREST,
    )
    return high_resolution.filter(ImageFilter.GaussianBlur(radius=1.05))


def representative_gold(source: Image.Image, gold_mask: np.ndarray) -> tuple[int, int, int]:
    pixels = np.asarray(source.filter(ImageFilter.MedianFilter(3)), dtype=np.uint8)
    selected = pixels[gold_mask]
    if selected.size == 0:
        raise ValueError("No gold artwork was detected")

    # A robust median preserves the source's intended gold while discarding
    # JPEG fringe colors. It is intentionally not normalized to the site token.
    return tuple(int(value) for value in np.median(selected, axis=0))


def compose_logo(
    cream_mask: np.ndarray,
    gold_mask: np.ndarray,
    gold: tuple[int, int, int],
) -> Image.Image:
    target_size = cream_mask.shape[::-1]
    cream_alpha = antialiased_mask(cream_mask).resize(
        target_size, Image.Resampling.LANCZOS
    )
    gold_alpha = antialiased_mask(gold_mask).resize(
        target_size, Image.Resampling.LANCZOS
    )

    result = Image.new("RGBA", target_size, (0, 0, 0, 0))
    cream_layer = Image.new("RGBA", target_size, (*CREAM, 0))
    cream_layer.putalpha(cream_alpha)
    result.alpha_composite(cream_layer)

    gold_layer = Image.new("RGBA", target_size, (*gold, 0))
    gold_layer.putalpha(gold_alpha)
    result.alpha_composite(gold_layer)
    return result


def main() -> None:
    args = parse_args()
    source = Image.open(args.source).convert("RGB")
    cream_mask, gold_mask = build_semantic_masks(source)
    gold = representative_gold(source, gold_mask)
    result = compose_logo(cream_mask, gold_mask, gold)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.save(args.output, format="PNG", optimize=True)
    print(f"Created {args.output}")
    print(f"Canvas: {result.width}x{result.height}")
    print(f"Cream mask pixels: {int(cream_mask.sum())}")
    print(f"Gold mask pixels: {int(gold_mask.sum())}")
    print(f"Preserved representative source gold: rgb{gold}")


if __name__ == "__main__":
    main()
