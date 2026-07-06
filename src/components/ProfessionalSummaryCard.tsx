type ProfessionalSummaryCardProps = {
  name: string;
  rating: string;
  status: string;
};

export default function ProfessionalSummaryCard({ name, rating, status }: ProfessionalSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-amber-300">{rating}</p>
      <p className="mt-2 text-sm text-slate-300">{status}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
          Ver calendario
        </button>
        <button className="rounded-xl bg-cyan-600 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-500">
          Asignar trabajo
        </button>
      </div>
    </div>
  );
}
