export const historicalArchiveMetadata = {
  year: 2012,
  photographer: 'Jonathan Friedlander',
} as const

const historicalArchiveEntries = [
  { filename: 'img552.jpg', width: 1771, height: 1181 },
  { filename: 'img553.jpg', width: 1763, height: 1180 },
  { filename: 'img554.jpg', width: 1775, height: 1188 },
  { filename: 'img555.jpg', width: 1784, height: 1184 },
  { filename: 'img556.jpg', width: 1776, height: 1181 },
  { filename: 'img557.jpg', width: 1776, height: 1187 },
  { filename: 'img558.jpg', width: 1765, height: 1186 },
  { filename: 'img559.jpg', width: 1188, height: 1776 },
  { filename: 'img583.jpg', width: 1759, height: 1181 },
  { filename: 'img584.jpg', width: 1783, height: 1187 },
  { filename: 'img585.jpg', width: 1184, height: 1778 },
  { filename: 'img586.jpg', width: 1765, height: 1181 },
  { filename: 'img588.jpg', width: 1771, height: 1193 },
  { filename: 'img589.jpg', width: 1777, height: 1192 },
  { filename: 'img590.jpg', width: 1768, height: 1190 },
  { filename: 'img591.jpg', width: 1756, height: 1187 },
] as const

export type HistoricalArchivePhotoId =
  (typeof historicalArchiveEntries)[number]['filename']

export type HistoricalArchivePhoto = {
  id: HistoricalArchivePhotoId
  filename: HistoricalArchivePhotoId
  src: string
  /** Intrinsic pixel dimensions, so layout is reserved before a lazy image loads. */
  width: number
  height: number
}

export const historicalArchiveImages: readonly HistoricalArchivePhoto[] =
  historicalArchiveEntries.map(({ filename, width, height }) => ({
    id: filename,
    filename,
    src: `/assets/history/archive/${filename}`,
    width,
    height,
  }))

export const featuredHistoryPhotoIds = [
  'img584.jpg',
  'img586.jpg',
  'img553.jpg',
  'img557.jpg',
] as const satisfies readonly HistoricalArchivePhotoId[]

const featuredHistoryPhotoIdSet = new Set<HistoricalArchivePhotoId>(
  featuredHistoryPhotoIds,
)

export const featuredHistoryPhotos = featuredHistoryPhotoIds.map((id) => {
  const photo = historicalArchiveImages.find((candidate) => candidate.id === id)

  if (!photo) {
    throw new Error(
      `Featured history photograph is missing from the archive: ${id}`,
    )
  }

  return photo
})

export const communityAlbumPhotos = historicalArchiveImages.filter(
  (photo) => !featuredHistoryPhotoIdSet.has(photo.id),
)
