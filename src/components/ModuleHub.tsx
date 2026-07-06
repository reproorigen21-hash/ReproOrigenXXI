import { useOS } from '../context/OSContext';
import { ContactForm } from './ContactForm';
import { ExploreSystem } from './ExploreSystem';
import { LeadCaptureForm } from './LeadCaptureForm';
import { SpaceContent } from './SpaceContent';

const MODULE_LABELS = {
  empresas: 'EMPRESAS',
  hogar: 'HOGAR',
  territorio: 'TERRITORIO',
  formacion: 'FORMACIÓN',
  comunidad: 'COMUNIDAD',
  experiencias: 'EXPERIENCIAS'
} as const;

export function ModuleHub() {
  const { state } = useOS();

  const activeLabel = state.activeModule ? MODULE_LABELS[state.activeModule] : null;

  return (
    <div className="module-hub">
      <aside className="module-hub__sidebar">
        <ExploreSystem />
      </aside>

      <section className="module-hub__content">
        <header className="module-hub__header">
          <h2>EXPLORAR EL ECOSISTEMA</h2>
          <p>{state.activeModule ? `Espacio activo: ${activeLabel}` : 'El sello permanece en el centro. Elige un espacio para descubrir su atmósfera.'}</p>
        </header>

        <div className="module-hub__ecosystem">
          <div className="module-hub__ecosystem-core">
            <span>REPROORIGEN XXI</span>
          </div>

          {Object.entries(MODULE_LABELS).map(([key, label]) => (
            <div
              key={key}
              className={`module-hub__ecosystem-node module-hub__ecosystem-node--${key} ${state.activeModule === key ? 'active' : 'inactive'}`}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="module-hub__preview">
          <SpaceContent activeModule={state.activeModule} />
        </div>

        <div className="module-hub__forms">
          <ContactForm />
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}
