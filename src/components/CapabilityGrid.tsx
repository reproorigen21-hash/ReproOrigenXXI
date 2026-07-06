import type { ReactNode } from 'react';
import { PremiumCard } from './PremiumCard';

type CapabilityGridItem = {
  title: string;
  text: string;
};

type CapabilityGridProps = {
  items: CapabilityGridItem[];
  children?: ReactNode;
};

export function CapabilityGrid({ items, children }: CapabilityGridProps) {
  return (
    <section className="capability-grid">
      {children ? <div className="capability-grid__header">{children}</div> : null}
      <div className="capability-grid__list">
        {items.map((item) => (
          <PremiumCard key={item.title} title={item.title} description={item.text} />
        ))}
      </div>
    </section>
  );
}
