import ReproAdminIA from '@/components/ReproAdminIA';
import IAStudioPanel from '@/components/IAStudioPanel';

export default function IAPage() {
  return (
    <div className="space-y-8 p-8 text-slate-200">
      <h1 className="text-4xl font-bold">IA</h1>
      <p className="text-slate-400">Centro de inteligencia artificial</p>
      <IAStudioPanel />
      <ReproAdminIA />
    </div>
  );
}
