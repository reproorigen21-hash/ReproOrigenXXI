type IAStudioCardProps = {
  title: string;
  description: string;
  status?: string;
};

export default function IAStudioCard({ title, description, status = 'Disponible' }: IAStudioCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-cyan-300/50">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
          {status}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-300">{description}</p>
      <button className="mt-4 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20">
        Abrir módulo
      </button>
    </article>
  );
}
