type ImpactItem = {
  metric: string;
  detail: string;
};

type ImpactSectionProps = {
  items: ImpactItem[];
};

export function ImpactSection({ items }: ImpactSectionProps) {
  return (
    <section className="impact-section">
      <div className="impact-section__grid">
        {items.map((item) => (
          <div key={item.detail} className="impact-section__card">
            <strong>{item.metric}</strong>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
