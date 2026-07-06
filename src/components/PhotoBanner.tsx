type PhotoBannerProps = {
  imageUrl: string;
  title: string;
  caption?: string;
};

export function PhotoBanner({ imageUrl, title, caption }: PhotoBannerProps) {
  return (
    <section className="photo-banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="photo-banner__overlay">
        <div>
          <strong>{title}</strong>
          {caption ? <p>{caption}</p> : null}
        </div>
      </div>
    </section>
  );
}
