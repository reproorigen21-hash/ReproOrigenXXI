import { ProfessionalCard } from './ProfessionalCard';
import type { Professional } from '../types/professional';

type ProfessionalGridProps = {
  professionals: Professional[];
};

export function ProfessionalGrid({ professionals }: ProfessionalGridProps) {
  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
      {professionals.map((professional) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  );
}
