#!/usr/bin/env python3
"""Create the transparent reverse navbar logo from the approved JPEG source.

This is deterministic pixel processing. It does not resize, redraw, trace, or
otherwise alter the source geometry. Pillow is required only when regenerating
the derived asset; it is not an application runtime dependency.
"""

from __future__ import annotations

import argparse
import colorsys
from pathlib import Path

from PIL import Image, ImageFilter


CREAM = (0xF3, 0xE9, 0xCF)
BACKGROUND_NOISE_FLOOR = 3 / 255


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    return parser.parse_args()


def channel_mode(image: Image.Image, channel: int) -> int:
    histogram = image.getchannel(channel).histogram()
    return max(range(256), key=histogram.__getitem__)


def color_to_alpha(
    color: tuple[int, int, int], background: tuple[int, int, int]
) -> tuple[tuple[int, int, int], float]:
    normalized = tuple(component / 255 for component in color)
    normalized_background = tuple(component / 255 for component in background)
    channel_alpha: list[float] = []

    for component, backdrop in zip(normalized, normalized_background, strict=True):
        if component < backdrop:
            channel_alpha.append((backdrop - component) / max(backdrop, 1e-9))
        elif component > backdrop:
            channel_alpha.append((component - backdrop) / max(1 - backdrop, 1e-9))
        else:
            channel_alpha.append(0)

    source_alpha = min(1.0, max(channel_alpha))
    if source_alpha <= BACKGROUND_NOISE_FLOOR:
        return (0, 0, 0), 0

    foreground = tuple(
        round(
            max(
                0,
                min(
                    1,
                    (component - (1 - source_alpha) * backdrop) / source_alpha,
                ),
            )
            * 255
        )
        for component, backdrop in zip(
            normalized, normalized_background, strict=True
        )
    )
    cleaned_alpha = (source_alpha - BACKGROUND_NOISE_FLOOR) / (
        1 - BACKGROUND_NOISE_FLOOR
    )
    return foreground, cleaned_alpha


def is_gold(color: tuple[int, int, int]) -> bool:
    red, green, blue = (component / 255 for component in color)
    hue, saturation, value = colorsys.rgb_to_hsv(red, green, blue)
    return 0.065 <= hue <= 0.19 and saturation >= 0.2 and value >= 0.08


def build_reverse_logo(source_path: Path, output_path: Path) -> dict[str, int]:
    source = Image.open(source_path).convert("RGB")
    background = tuple(channel_mode(source, channel) for channel in range(3))
    output = Image.new("RGBA", source.size, (0, 0, 0, 0))

    unmixed_pixels: list[tuple[tuple[int, int, int], float]] = []
    core_mask_pixels: list[int] = []
    for source_color in source.getdata():
        foreground, alpha = color_to_alpha(source_color, background)
        unmixed_pixels.append((foreground, alpha))

        _, saturation, _ = colorsys.rgb_to_hsv(
            *(component / 255 for component in foreground)
        )
        is_confident_stroke = alpha >= 0.08 and (
            saturation >= 0.12 or max(source_color) < 210
        )
        core_mask_pixels.append(255 if is_confident_stroke else 0)

    core_mask = Image.new("L", source.size)
    core_mask.putdata(core_mask_pixels)
    supported_edge_mask = core_mask.filter(ImageFilter.MaxFilter(9))

    transparent_pixels = 0
    cream_pixels = 0
    gold_pixels = 0
    result_pixels: list[tuple[int, int, int, int]] = []

    for (foreground, alpha), is_supported in zip(
        unmixed_pixels, supported_edge_mask.getdata(), strict=True
    ):
        if alpha == 0 or not is_supported:
            result_pixels.append((0, 0, 0, 0))
            transparent_pixels += 1
            continue

        _, saturation, _ = colorsys.rgb_to_hsv(
            *(component / 255 for component in foreground)
        )
        if alpha < 0.025 and saturation < 0.15:
            result_pixels.append((0, 0, 0, 0))
            transparent_pixels += 1
            continue

        if is_gold(foreground):
            output_color = foreground
            gold_pixels += 1
        else:
            output_color = CREAM
            cream_pixels += 1

        result_pixels.append((*output_color, round(alpha * 255)))

    output.putdata(result_pixels)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output.save(output_path, format="PNG", optimize=True)

    return {
        "background_red": background[0],
        "background_green": background[1],
        "background_blue": background[2],
        "transparent_pixels": transparent_pixels,
        "cream_pixels": cream_pixels,
        "gold_pixels": gold_pixels,
    }


def main() -> None:
    args = parse_args()
    stats = build_reverse_logo(args.source, args.output)
    print(f"Created {args.output}")
    print(
        "Detected background: "
        f"rgb({stats['background_red']}, {stats['background_green']}, "
        f"{stats['background_blue']})"
    )
    print(
        "Pixels — transparent: "
        f"{stats['transparent_pixels']}, cream: {stats['cream_pixels']}, "
        f"preserved gold: {stats['gold_pixels']}"
    )


if __name__ == "__main__":
    main()
