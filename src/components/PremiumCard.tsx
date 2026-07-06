import type { ReactNode } from 'react';

type PremiumCardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PremiumCard({ title, description, children }: PremiumCardProps) {
  return (
    <article className="premium-card">
      <strong>{title}</strong>
      <p>{description}</p>
      {children ? <div className="premium-card__extra">{children}</div> : null}
    </article>
  );
}
