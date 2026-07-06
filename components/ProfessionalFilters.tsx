type ProfessionalFiltersProps = {
  specialties: string[];
  activeFilter: string;
  onFilterChange: (specialty: string) => void;
};

export function ProfessionalFilters({ specialties, activeFilter, onFilterChange }: ProfessionalFiltersProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <button
        type="button"
        onClick={() => onFilterChange('Todas')}
        style={{
          padding: '8px 12px',
          borderRadius: 999,
          border: activeFilter === 'Todas' ? '1px solid #7dd3fc' : '1px solid rgba(255,255,255,0.12)',
          background: activeFilter === 'Todas' ? 'rgba(125, 211, 252, 0.16)' : 'rgba(255,255,255,0.06)',
          color: '#f8fafc'
        }}
      >
        Todas
      </button>
      {specialties.map((specialty) => (
        <button
          key={specialty}
          type="button"
          onClick={() => onFilterChange(specialty)}
          style={{
            padding: '8px 12px',
            borderRadius: 999,
            border: activeFilter === specialty ? '1px solid #7dd3fc' : '1px solid rgba(255,255,255,0.12)',
            background: activeFilter === specialty ? 'rgba(125, 211, 252, 0.16)' : 'rgba(255,255,255,0.06)',
            color: '#f8fafc'
          }}
        >
          {specialty}
        </button>
      ))}
    </div>
  );
}
