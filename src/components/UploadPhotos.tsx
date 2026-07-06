export default function UploadPhotos() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold">Subir fotos</h2>
      <input type="file" multiple accept="image/*" className="mt-4 block w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-slate-200" />
    </div>
  );
}
