import type { ReactNode } from 'react';

type SectionHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
  visual?: ReactNode;
};

export function SectionHero({ eyebrow, title, description, actions, visual }: SectionHeroProps) {
  return (
    <section className="section-hero">
      <div className="section-hero__content">
        <span className="section-hero__eyebrow">{eyebrow}</span>
        <h2 className="section-hero__title">{title}</h2>
        <p className="section-hero__text">{description}</p>
        <div className="section-hero__actions">{actions}</div>
      </div>
      {visual ? <div className="section-hero__visual">{visual}</div> : null}
    </section>
  );
}
