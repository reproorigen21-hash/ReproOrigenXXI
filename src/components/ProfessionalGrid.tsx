import ProfessionalCard from './ProfessionalCard';

export default function ProfessionalGrid({ professionals }: any) {
  return (
    <div className="mt-12 grid grid-cols-3 gap-6">
      {professionals.map((professional: any) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  );
}
