import type { ReactNode } from 'react';
import { useOS } from '../context/OSContext';

export function OSShell({ children }: { children: ReactNode }) {
  const { state } = useOS();

  return (
    <div className="os-shell">
      <header className="os-shell__header">
        <div>
          <strong>OS_Shell</strong>
          <p>Módulo activo: {state.activeModule ?? 'ninguno'}</p>
        </div>
        <div className="os-shell__meta">
          <span>Tipo de usuario: {state.userType || 'no definido'}</span>
          <span>Interés: {state.interest || 'no definido'}</span>
          <span>Origen: {state.origin}</span>
        </div>
      </header>
      <main className="os-shell__body">{children}</main>
    </div>
  );
}
