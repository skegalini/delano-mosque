import {
  communityAlbumPhotos,
  featuredHistoryPhotoIds,
  featuredHistoryPhotos,
  historicalArchiveImages,
} from './historyArchive'

describe('history archive collections', () => {
  it('carries intrinsic dimensions for every archive photograph', () => {
    historicalArchiveImages.forEach((photo) => {
      expect(photo.width).toBeGreaterThan(0)
      expect(photo.height).toBeGreaterThan(0)
    })
  })

  it('partitions every archive photograph between featured media and the album', () => {
    const archiveIds = historicalArchiveImages.map((photo) => photo.id)
    const featuredIds = featuredHistoryPhotos.map((photo) => photo.id)
    const albumIds = communityAlbumPhotos.map((photo) => photo.id)
    const featuredIdSet = new Set(featuredIds)

    expect(new Set(archiveIds).size).toBe(16)
    expect(featuredIds).toEqual(featuredHistoryPhotoIds)
    expect(albumIds).toHaveLength(12)
    expect(new Set(albumIds).size).toBe(12)
    expect(albumIds.some((id) => featuredIdSet.has(id))).toBe(false)
    expect(new Set([...featuredIds, ...albumIds])).toEqual(new Set(archiveIds))
  })
})
