import type { ReactNode } from 'react';

type CTASectionProps = {
  title: string;
  description: string;
  actions: ReactNode;
};

export function CTASection({ title, description, actions }: CTASectionProps) {
  return (
    <section className="cta-section">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="cta-section__actions">{actions}</div>
    </section>
  );
}
