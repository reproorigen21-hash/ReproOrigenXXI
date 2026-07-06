import { useState } from 'react';

export default function InstallerSearch() {
  const [province, setProvince] = useState('Castellón');
  const [specialty, setSpecialty] = useState('PVC');
  const [available, setAvailable] = useState(true);
  const [results] = useState(12);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold">Buscar instaladores</h2>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-slate-400">Provincia</label>
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-200"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Especialidad</label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-slate-200"
          >
            <option>PVC</option>
            <option>ALUMINIO</option>
            <option>CRISTAL</option>
            <option>ELECTRICIDAD</option>
            <option>FONTANERIA</option>
            <option>ALBAÑILERIA</option>
            <option>PINTURA</option>
            <option>PLADUR</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="h-4 w-4" />
          <label className="text-sm text-slate-400">Disponible</label>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-slate-800/50 p-4">
        <p className="text-center text-lg font-semibold text-cyan-300">{results} instaladores encontrados</p>
      </div>

      <button className="mt-6 w-full rounded-xl bg-cyan-600 px-4 py-3 font-medium text-white transition hover:bg-cyan-500">
        Asignar obra
      </button>
    </div>
  );
}
