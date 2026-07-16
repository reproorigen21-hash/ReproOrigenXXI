type PhotoBannerProps = {
  imageUrl?: string;
  title: string;
  eyebrow?: string;
  caption?: string;
  variant?: 'archive' | 'journey';
};

export function PhotoBanner({ imageUrl, title, eyebrow, caption, variant }: PhotoBannerProps) {
  const className = ['photo-banner', variant ? `photo-banner--${variant}` : null].filter(Boolean).join(' ');

  return (
    <section className={className} style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}>
      {variant ? (
        <div className="photo-banner__scene" aria-hidden="true">
          <span className="photo-banner__layer photo-banner__layer--halo" />
          <span className="photo-banner__layer photo-banner__layer--texture" />
          <span className="photo-banner__layer photo-banner__layer--detail" />
        </div>
      ) : null}
      <div className="photo-banner__overlay">
        <div>
          {eyebrow ? <span className="photo-banner__eyebrow">{eyebrow}</span> : null}
          <strong>{title}</strong>
          {caption ? <p>{caption}</p> : null}
        </div>
      </div>
    </section>
  );
}
