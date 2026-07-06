'use client';

import { useMemo, useState } from 'react';
import { ProfessionalFilters } from '../../components/ProfessionalFilters';
import { ProfessionalGrid } from '../../components/ProfessionalGrid';
import { professionals } from '../../data/professionals';

export default function RedProfesionalPage() {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const trades = useMemo(() => {
    return Array.from(new Set(professionals.map((person) => person.trade)));
  }, []);

  const visibleProfessionals = useMemo(() => {
    if (activeFilter === 'Todas') {
      return professionals;
    }

    return professionals.filter((person) => person.trade === activeFilter);
  }, [activeFilter]);

  return (
    <main style={{ minHeight: '100vh', padding: '48px 24px', background: 'linear-gradient(180deg, #040b15 0%, #07101a 100%)', color: '#f8fafc' }}>
      <section style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <p style={{ margin: 0, color: '#7dd3fc', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: 13 }}>Red profesional</p>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>Conectando talento, proyectos y territorio</h1>
          <p style={{ margin: 0, maxWidth: 760, color: '#cbd5e1', lineHeight: 1.8 }}>
            Esta red reúne perfiles especializados que pueden acompañar iniciativas de territorio, financiación, formación y diseño de experiencias.
          </p>
        </div>

        <ProfessionalFilters specialties={trades} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <ProfessionalGrid professionals={visibleProfessionals} />
      </section>
    </main>
  );
}
