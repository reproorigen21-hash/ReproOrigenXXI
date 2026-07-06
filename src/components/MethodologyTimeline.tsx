type MethodologyTimelineItem = {
  step: string;
  description: string;
};

type MethodologyTimelineProps = {
  items: MethodologyTimelineItem[];
};

export function MethodologyTimeline({ items }: MethodologyTimelineProps) {
  return (
    <section className="methodology-timeline">
      {items.map((item, index) => (
        <div key={item.step} className="methodology-timeline__item">
          <span className="methodology-timeline__step">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <p>{item.step}</p>
            <span>{item.description}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
