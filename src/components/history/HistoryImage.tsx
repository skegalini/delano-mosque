type HistoryImageProps = {
  src?: string
  alt?: string
  caption?: string
  year?: string
  credit?: string
  emptyLabel: string
  className?: string
  objectPosition?: string
}

export function HistoryImage({
  src,
  alt = '',
  caption,
  year,
  credit,
  emptyLabel,
  className = '',
  objectPosition,
}: HistoryImageProps) {
  const details = [year, caption, credit].filter(Boolean)

  return (
    <figure className={`history-image ${className}`.trim()}>
      {src ? (
        <img
          className="history-image__media"
          src={src}
          alt={alt}
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        <div className="history-image__reserved" aria-label={emptyLabel}>
          <span className="history-image__ornament" aria-hidden="true" />
          <span className="history-image__label">{emptyLabel}</span>
        </div>
      )}

      {details.length > 0 && (
        <figcaption className="history-image__caption">
          {details.map((detail, index) => (
            <span key={`${detail}-${index}`}>{detail}</span>
          ))}
        </figcaption>
      )}
    </figure>
  )
}
