import type { RegisteredAgent } from '@/core';

const createAgent = (id: string, name: string, description: string, version = '1.0.0', status: RegisteredAgent['status'] = 'pilot'): RegisteredAgent => ({
  id,
  name,
  description,
  status,
  version,
  execute: async (task) => ({ agent: name, task }),
  validate: () => true,
  remember: () => undefined,
  log: () => undefined
});

export const builtinAgents: RegisteredAgent[] = [
  createAgent('repro-admin-ia', 'ReproAdminIA', 'Asistente de administracion, empresas y territorio.', '1.0.0', 'active'),
  createAgent('repro-calendar-ia', 'ReproCalendarIA', 'Planifica citas, reuniones y recordatorios.', '1.0.0', 'active'),
  createAgent('repro-empresa-ia', 'ReproEmpresaIA', 'Gestion comercial y operativa para empresas.', '1.0.0', 'active'),
  createAgent('repro-legal-ia', 'ReproLegalIA', 'Apoyo juridico y control documental.', '0.9.0', 'pilot'),
  createAgent('repro-subvenciones-ia', 'ReproSubvencionesIA', 'Deteccion y preparacion de ayudas y expedientes.', '1.0.0', 'active'),
  createAgent('repro-hospitalidad-ia', 'ReproHospitalidadIA', 'Reservas, recepcion y experiencia de cliente.', '0.9.0', 'pilot'),
  createAgent('repro-ayuntamiento-ia', 'ReproAyuntamientoIA', 'Atencion ciudadana y expedientes municipales.', '1.0.0', 'active'),
  createAgent('repro-inmobiliaria-ia', 'ReproInmobiliariaIA', 'Captacion, ventas, alquileres y postventa.', '1.0.0', 'active'),
  createAgent('repro-editorial-ia', 'ReproEditorialIA', 'Documentacion, comunicacion y contenidos.', '0.9.0', 'pilot'),
  createAgent('repro-campus-ia', 'ReproCampusIA', 'Coordinacion academica y formativa.', '0.9.0', 'pilot'),
  createAgent('repro-constitucion-ia', 'ReproConstitucionIA', 'Derechos constitucionales y comisiones de apoyo al ciudadano, trabajador y empresario.', '1.0.0', 'active')
];
