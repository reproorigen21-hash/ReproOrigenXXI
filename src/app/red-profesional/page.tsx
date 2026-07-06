import { professionals } from '@/data/professionals';
import ProfessionalGrid from '@/components/ProfessionalGrid';

export default function RedProfesional() {
  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold">Red Profesional</h1>
      <p className="mt-4 opacity-70">Encuentra colaboradores verificados para tus proyectos.</p>
      <div className="mt-10">
        <ProfessionalGrid professionals={professionals} />
      </div>
    </div>
  );
}
