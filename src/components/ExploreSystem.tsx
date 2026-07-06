import type { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../context/OSContext';
import type { ModuleKey } from '../types';

const MODULES: Array<{ key: ModuleKey; title: string; icon: string; tone: string }> = [
  { key: 'empresas', title: 'EMPRESAS', icon: '🏢', tone: 'ámbar' },
  { key: 'territorio', title: 'TERRITORIO', icon: '🌍', tone: 'verde bosque' },
  { key: 'formacion', title: 'FORMACIÓN', icon: '🎓', tone: 'biblioteca' },
  { key: 'hogar', title: 'HOGAR', icon: '🏠', tone: 'pergamino' },
  { key: 'comunidad', title: 'COMUNIDAD', icon: '🤝', tone: 'colaboración' },
  { key: 'experiencias', title: 'EXPERIENCIAS', icon: '🌿', tone: 'paisaje' }
];

export function ExploreSystem() {
  const { state, updateOS } = useOS();

  const handleModuleActivate = (module: ModuleKey) => {
    updateOS({ activeModule: module, origin: 'ecosistema' });
  };

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateOS({ userType: event.target.value, origin: 'ecosistema' });
  };

  const handleInterestChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateOS({ interest: event.target.value, origin: 'ecosistema' });
  };

  return (
    <div className="explore-system">
      <div className="explore-system__header">
        <h2>EXPLORAR EL ECOSISTEMA</h2>
        <p>El sello permanece en el centro. Los espacios orbitan con calma y suspiran en torno a él.</p>
      </div>

      <div className="explore-system__canvas">
        {MODULES.map((module) => (
          <motion.div
            key={module.key}
            role="button"
            tabIndex={0}
            className={`explore-system__space explore-system__space--${module.key} ${state.activeModule === module.key ? 'active' : 'inactive'}`}
            onClick={() => handleModuleActivate(module.key)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleModuleActivate(module.key);
              }
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="explore-system__icon">{module.icon}</span>
            <span>{module.title}</span>
          </motion.div>
        ))}

        <div className="explore-system__seal">
          <div>EL SELLO</div>
          <div className="explore-system__seal-subtitle">DEL SIGLO</div>
        </div>
      </div>

      <div className="explore-system__trail">Abrir un espacio del ecosistema</div>

      <div className="explore-system__selectors">
        <label>
          Tipo de usuario
          <select value={state.userType} onChange={handleUserTypeChange}>
            <option value="">Seleccionar</option>
            <option value="emprendedor">Emprendedor</option>
            <option value="mentor">Mentor</option>
            <option value="empresa">Empresa</option>
          </select>
        </label>
        <label>
          Interés
          <select value={state.interest} onChange={handleInterestChange}>
            <option value="">Seleccionar</option>
            <option value="crecimiento">Crecimiento</option>
            <option value="automatizacion">Automatización</option>
            <option value="comunidad">Comunidad</option>
          </select>
        </label>
      </div>
    </div>
  );
}
