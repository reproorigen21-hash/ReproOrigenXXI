import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { OSProvider, useOS } from './context/OSContext';
import { publicConfig } from './config/publicConfig';
import { mision004Service } from './mision004/services';
import type { Factura } from './mision004/types';
import { PhotoBanner } from './components/PhotoBanner';

const publicRoutes = [
  'inicio',
  'soluciones',
  'sectores',
  'automatizacion-inteligente',
  'escuela-editorial',
  'editorial-reproorigen',
  'la-llegada-de-la-promesa',
  'campus-reproorigen',
  'catalogo-agentes-ia',
  'jerarquia-reproorigen',
  'comunidad-reproorigen',
  'quienes-somos',
  'nuestro-metodo',
  'colabora-con-nosotros',
  'como-trabajamos',
  'nuestra-comunidad',
  'casos-transformacion',
  'alianzas',
  'preguntas-frecuentes',
  'fundacion',
  'albatour',
  'mapa-conocimiento',
  'biblioteca-viva',
  'portal-cliente',
  'centro-configuracion',
  'solicitar-diagnostico',
  'reservar-reunion',
  'que-obtendra',
  'impacto',
  'centro-direccion',
  'contacto',
  'aviso-legal',
  'privacidad',
  'cookies'
] as const;

type PublicRoute = (typeof publicRoutes)[number];

const routeLabels: Record<PublicRoute, string> = {
  inicio: 'Inicio',
  'quienes-somos': 'Quiénes Somos',
  'nuestro-metodo': 'Nuestro Método',
  'colabora-con-nosotros': 'Colabora con Nosotros',
  soluciones: 'Soluciones',
  sectores: 'Sectores',
  'automatizacion-inteligente': 'Arquitectos IA',
  'escuela-editorial': 'Escuela Editorial',
  'editorial-reproorigen': 'Editorial ReproOrigen XXI',
  'la-llegada-de-la-promesa': 'La Llegada de la Promesa',
  'campus-reproorigen': 'Campus ReproOrigen XXI',
  'catalogo-agentes-ia': 'Catalogo de Arquitectos IA',
  'jerarquia-reproorigen': 'Jerarquia ReproOrigen XXI',
  'comunidad-reproorigen': 'Comunidad ReproOrigen XXI',
  'como-trabajamos': '¿Cómo Trabajamos?',
  'nuestra-comunidad': 'Nuestra Comunidad',
  'casos-transformacion': 'Casos de Transformación',
  alianzas: 'Alianzas',
  'preguntas-frecuentes': 'Preguntas Frecuentes',
  'biblioteca-viva': 'Biblioteca Viva',
  'portal-cliente': 'Relaciones',
  'centro-configuracion': 'Preferencias del Proyecto',
  'solicitar-diagnostico': 'Solicitar Diagnostico',
  'reservar-reunion': 'Reservar Reunion',
  'que-obtendra': '¿Que obtendra?',
  impacto: 'Impacto',
  'centro-direccion': 'Sala de Direccion',
  fundacion: 'Fundación',
  albatour: 'ALBATOUR',
  'mapa-conocimiento': 'Mapa del Conocimiento',
  contacto: 'Contacto',
  'aviso-legal': 'Aviso Legal',
  privacidad: 'Política de Privacidad',
  cookies: 'Política de Cookies'
};

const pageMeta: Record<PublicRoute, { title: string; description: string }> = {
  inicio: {
    title: `Inicio | ${publicConfig.companyName} - Tecnologia con proposito`,
    description: 'ReproOrigen XXI integra tecnología, inteligencia artificial, personas, territorio y comunidad para transformar en menos de dos minutos tu visión de futuro.'
  },
  'quienes-somos': {
    title: 'Quiénes Somos | ReproOrigen XXI',
    description: 'Conoce la historia, misión, visión y valores de ReproOrigen XXI: tecnología con propósito, desarrollo territorial y comunidad.'
  },
  'nuestro-metodo': {
    title: 'Nuestro Método | ReproOrigen XXI',
    description: 'Proceso completo de ReproOrigen XXI desde diagnóstico hasta comunidad, con foco en impacto ambiental y confianza comercial.'
  },
  'colabora-con-nosotros': {
    title: 'Colabora con Nosotros | ReproOrigen XXI',
    description: 'Buscamos colaboradores para integrarse al ecosistema ReproOrigen XXI en gestoría, construcción, energía, educación y territorio.'
  },
  soluciones: {
    title: 'Soluciones | ReproOrigen XXI - Ecosistemas conectados',
    description: 'Soluciones para empresas, administraciones, comunidades, energía, turismo, educación y Biblioteca Viva y Bienestar.'
  },
  sectores: {
    title: 'Sectores | ReproOrigen XXI - Impacto transversal',
    description: 'Sectores estratégicos donde ReproOrigen XXI aplica tecnología, IA y ejecución con foco empresarial, territorial y social.'
  },
  'automatizacion-inteligente': {
    title: 'Arquitectos IA | ReproOrigen XXI - Automatización humana',
    description: 'Ecosistema de Arquitectos IA para comercial, subvenciones, jurídico, administración, turismo, energía, medio ambiente, editorial y fundación.'
  },
  'escuela-editorial': {
    title: 'Escuela Editorial ReproOrigen XXI | Método ReproOrigen',
    description: 'Acompañamos a cada autor desde la idea hasta la publicación, con identidad editorial, comunidad y apoyo de arquitectos IA especializados.'
  },
  'editorial-reproorigen': {
    title: 'Editorial ReproOrigen XXI | Sistema Editorial de Obras Vivas',
    description: 'Arquitectura visual del sistema editorial: Proyecto Editorial, Obras Vivas y estructura de conocimiento por libro.'
  },
  'la-llegada-de-la-promesa': {
    title: 'La Llegada de la Promesa | Obra Fundacional ReproOrigen XXI',
    description: 'Ficha pública y página editorial de la Obra Fundacional de ReproOrigen XXI dentro de la colección Obras Vivas.'
  },
  'campus-reproorigen': {
    title: 'Campus ReproOrigen XXI | Escuelas',
    description: 'Arquitectura del Campus ReproOrigen XXI organizada por escuelas tematicas.'
  },
  'catalogo-agentes-ia': {
    title: 'Catalogo de Arquitectos IA | ReproOrigen XXI',
    description: 'Mapa estructural del ecosistema de arquitectos IA por areas operativas y estrategicas.'
  },
  'jerarquia-reproorigen': {
    title: 'Jerarquia ReproOrigen XXI | Director, Guardianes y Arquitectos IA',
    description: 'Estructura oficial del ecosistema ReproOrigen XXI: Director, Consejo de Guardianes, Arquitectos IA y familias operativas.'
  },
  'comunidad-reproorigen': {
    title: 'Comunidad ReproOrigen XXI | Colaboradores',
    description: 'Mapa de categorias de colaboradores de la Comunidad ReproOrigen XXI.'
  },
  'como-trabajamos': {
    title: '¿Cómo Trabajamos? | ReproOrigen XXI',
    description: 'Conoce el recorrido del cliente en ReproOrigen XXI: desde el primer contacto hasta el impacto social y ambiental.'
  },
  'nuestra-comunidad': {
    title: 'Nuestra Comunidad | ReproOrigen XXI',
    description: 'Cada cliente forma parte de la Comunidad ReproOrigen XXI basada en colaboración, innovación y compromiso con próximas generaciones.'
  },
  'casos-transformacion': {
    title: 'Casos de Transformación | ReproOrigen XXI',
    description: 'Casos de transformación con problema, solución y beneficios esperados para sectores clave del ecosistema ReproOrigen XXI.'
  },
  alianzas: {
    title: 'Alianzas | ReproOrigen XXI',
    description: 'Perfiles colaboradores para integrarse al ecosistema ReproOrigen XXI: gestorías, ingenierías, constructoras, universidades y más.'
  },
  'preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | ReproOrigen XXI',
    description: 'Respuestas claras sobre metodología, colaboración, arquitectos IA, subvenciones, cobertura geográfica y Fundación ReproOrigen XXI.'
  },
  fundacion: {
    title: 'Fundación ReproOrigen XXI | Compromiso territorial',
    description: 'Compromiso de ReproOrigen XXI con reforestación, educación, desarrollo territorial, colegios y voluntariado ambiental.'
  },
  albatour: {
    title: 'ALBATOUR | Experiencias con propósito',
    description:
      'ALBATOUR se integra como operador de experiencias de ReproOrigen XXI con viajes escolares, rutas culturales, turismo educativo y retiros.'
  },
  'mapa-conocimiento': {
    title: 'Mapa del Conocimiento | ReproOrigen XXI',
    description:
      'Estructura pública de áreas de conocimiento con conexiones futuras a Campus, Editorial, Arquitectos IA, Fundación y ALBATOUR.'
  },
  'biblioteca-viva': {
    title: `${publicConfig.entities.bibliotecaViva} ${publicConfig.companyName} | Inspiracion y comunidad`,
    description: 'Tecnología para las empresas. Historias para las personas. Biblioteca Viva presenta 21 Cuentos para Sanar y el Reto de 21 días.'
  },
  'portal-cliente': {
    title: `Relaciones | ${publicConfig.companyName}`,
    description: 'Acceso visual al espacio de relaciones con proyectos, presupuestos, facturas, documentos, contratos, subvenciones, reuniones e impacto ambiental.'
  },
  'centro-configuracion': {
    title: `Preferencias del Proyecto | ${publicConfig.companyName}`,
    description: 'Espacio interno visual de preferencias del proyecto para empresa, fundacion, Biblioteca Viva, Albatour, contacto, redes sociales y SEO.'
  },
  'solicitar-diagnostico': {
    title: `Solicitar Diagnostico | ${publicConfig.companyName}`,
    description: 'Conoce que analizamos, que recibe el cliente, la duracion del servicio y los sectores antes de solicitar diagnostico.'
  },
  'reservar-reunion': {
    title: `Reservar Reunion | ${publicConfig.companyName}`,
    description: 'Formulario visual para reservar reunion comercial con ReproOrigen XXI sin conexion backend.'
  },
  'que-obtendra': {
    title: `¿Que obtendra? | ${publicConfig.companyName}`,
    description: 'Recorrido comercial de valor: diagnostico, analisis IA, subvenciones, propuesta, proyecto, seguimiento e impacto ambiental.'
  },
  impacto: {
    title: `Impacto | ${publicConfig.companyName}`,
    description: 'Panel demostrativo de impacto con empresas acompanadas, municipios, arboles, proyectos, sectores, arquitectos IA y comunidad.'
  },
  'centro-direccion': {
    title: `Sala de Direccion | ${publicConfig.companyName}`,
    description: 'Panel ejecutivo para Direccion con estado de empresa, IA, impacto, observatorio, campus, editorial, comunidad y agenda.'
  },
  contacto: {
    title: 'Contacto | ReproOrigen XXI',
    description: 'Solicita diagnóstico o reunión con ReproOrigen XXI. Formulario preparado para integración posterior con CRM.'
  },
  'aviso-legal': {
    title: 'Aviso Legal | ReproOrigen XXI',
    description: 'Información legal corporativa de la web pública de ReproOrigen XXI.'
  },
  privacidad: {
    title: 'Política de Privacidad | ReproOrigen XXI',
    description: 'Política de privacidad de la web pública de ReproOrigen XXI.'
  },
  cookies: {
    title: 'Política de Cookies | ReproOrigen XXI',
    description: 'Información sobre el uso de cookies en la web pública de ReproOrigen XXI.'
  }
};

const ecosystems = [
  'Empresas',
  'Administraciones Públicas',
  'Comunidades de Propietarios',
  'Energía y Rehabilitación',
  'Turismo',
  'Educación',
  'Biblioteca Viva y Bienestar',
  'Agricultura, Viveros y Medio Ambiente',
  'Fundación ReproOrigen XXI'
];

const ecosystemNarratives: Record<string, string> = {
  Empresas: 'Estrategia, operación y crecimiento con procesos medibles y acompañamiento continuo.',
  'Administraciones Públicas': 'Programas ejecutables, trazabilidad documental y coordinación entre áreas públicas y privadas.',
  'Comunidades de Propietarios': 'Mejoras técnicas y financieras con propuestas claras para juntas, vecinos y administradores.',
  'Energía y Rehabilitación': 'Diagnóstico, subvenciones, proyecto y ejecución con enfoque en retorno económico y confort.',
  Turismo: 'Diseño de oferta, relato y comercialización para territorios y negocios con identidad propia.',
  Educación: 'Formación aplicada para centros, docentes, equipos y comunidades de aprendizaje.',
  'Biblioteca Viva y Bienestar': 'Lectura, creación y acompañamiento editorial para familias, autores y entidades.',
  'Agricultura, Viveros y Medio Ambiente': 'Proyectos productivos y ambientales con impacto territorial y continuidad operativa.',
  'Fundación ReproOrigen XXI': 'Impacto social y ambiental orientado a resultados visibles y colaboración intersectorial.'
};

const sectors = [
  'Cerámica',
  'Energía',
  'Rehabilitación Energética',
  'Ventanas PVC',
  'Placas Solares',
  'Climatización',
  'Gestorías',
  'Administradores de Fincas',
  'Constructoras',
  'Inmobiliarias',
  'Hoteles',
  'Turismo',
  'Agricultura',
  'Cítricos',
  'Viveros',
  'Jardinería',
  'Ayuntamientos',
  'Colegios',
  'Universidades'
];

const sectorNarratives: Record<string, string> = {
  'Cerámica': 'Automatización comercial y documental para ciclos de venta técnica y postventa.',
  Energía: 'Proyectos de transición energética con foco en viabilidad técnica y económica.',
  'Rehabilitación Energética': 'Coordinación integral entre diagnóstico, ayudas y ejecución de obra.',
  'Ventanas PVC': 'Flujo comercial, presupuesto, subvenciones e instalación con trazabilidad completa.',
  'Placas Solares': 'Modelos de autoconsumo y ahorro energético con planificación clara de retorno.',
  Climatización: 'Propuestas de confort y eficiencia con acompañamiento técnico y operativo.',
  'Gestorías': 'Colaboración administrativa para acelerar expedientes, contratos y cumplimiento.',
  'Administradores de Fincas': 'Activación de demanda en comunidades con seguimiento por fases.',
  Constructoras: 'Orquestación de proveedores y documentación para ejecución coordinada.',
  Inmobiliarias: 'Flujos de captación, comercialización y coordinación de servicios asociados.',
  Hoteles: 'Optimización de oferta, operaciones y narrativa de experiencia territorial.',
  Turismo: 'Diseño de producto, promoción y conversión con enfoque de destino.',
  Agricultura: 'Digitalización operativa y acceso a ayudas para nuevos modelos de valor.',
  'Cítricos': 'Mejora de procesos comerciales y coordinación logística en campañas.',
  Viveros: 'Escalado de catálogo, alianzas y planificación de servicios ambientales.',
  Jardinería: 'Servicios de mantenimiento y mejora verde con continuidad anual.',
  Ayuntamientos: 'Programas públicos con indicadores, cronogramas y ejecución medible.',
  Colegios: 'Proyectos educativos vinculados a territorio, lectura e impacto comunitario.',
  Universidades: 'Transferencia de conocimiento aplicada a casos reales de empresa y municipio.'
};

type NicheSprintCard = {
  niche: string;
  promise: string;
  firstDeliverable: string;
  kpi: string;
  nextStep: string;
  recommendedAgent: string;
  campaignAd: string;
  landingMessage: string;
  callOpening: string;
};

const priorityNicheSprints: NicheSprintCard[] = [
  {
    niche: 'Ventanas PVC',
    promise: 'Más visitas cualificadas y menos tiempo perdido en presupuestos no viables.',
    firstDeliverable: 'Guion de llamada + ficha de oportunidad + checklist de subvenciones en 72 horas.',
    kpi: 'Tiempo medio desde lead a visita técnica.',
    nextStep: 'Activar flujo Director IA -> Comercial -> Agenda -> Subvenciones.',
    recommendedAgent: 'ReproComercialIA + ReproSubvencionesIA',
    campaignAd: '¿Cuántos presupuestos de ventanas se quedan sin cerrar? Activa un sistema comercial con diagnóstico, ayudas y seguimiento en una sola ruta.',
    landingMessage: 'Convierte interés en visitas reales con una metodología clara para ventanas PVC.',
    callOpening: 'Te llamo para ayudarte a pasar de presupuestos dispersos a cierres previsibles en ventanas PVC.'
  },
  {
    niche: 'Rehabilitación Energética',
    promise: 'Pasar de propuestas dispersas a un pipeline de proyectos por fases.',
    firstDeliverable: 'Plantilla de diagnóstico + mapa de ayudas + hoja de ruta de ejecución.',
    kpi: 'Ratio diagnóstico/propuesta firmada.',
    nextStep: 'Activar observatorio de ayudas y comité semanal de avance.',
    recommendedAgent: 'Director IA + ReproObrasIA + ReproSubvencionesIA',
    campaignAd: 'Rehabilitación energética sin caos: diagnóstico, subvenciones y ejecución con trazabilidad completa.',
    landingMessage: 'Diseñamos un plan técnico-comercial para rehabilitación con hitos claros desde el día uno.',
    callOpening: 'Quiero enseñarte cómo estructurar rehabilitación energética en fases que tu cliente sí entiende y aprueba.'
  },
  {
    niche: 'Administradores de Fincas',
    promise: 'Transformar juntas difíciles en decisiones ejecutables con cifras claras.',
    firstDeliverable: 'Dosier técnico-económico para junta + calendario de hitos por comunidad.',
    kpi: 'Aprobaciones de junta por trimestre.',
    nextStep: 'Activar módulo de actas, tareas y seguimiento para presidencias y vecinos.',
    recommendedAgent: 'ReproCRMIA + ReproDocumentosIA',
    campaignAd: 'Lleva a junta propuestas claras, financiables y con calendario real de ejecución.',
    landingMessage: 'Más acuerdos y menos bloqueo: convierte comunidades en proyectos viables.',
    callOpening: 'Te propongo un sistema para que cada junta salga con decisiones claras, responsables y fechas.'
  },
  {
    niche: 'Hoteles y Turismo',
    promise: 'Mejorar ocupación y ticket medio con una propuesta de valor territorial.',
    firstDeliverable: 'Oferta experiencial de 3 capas: estancia, territorio y contenido.',
    kpi: 'Reservas directas y repetición de cliente.',
    nextStep: 'Activar calendario comercial con campañas estacionales y alianzas locales.',
    recommendedAgent: 'ReproTurismoIA + ReproHotelIA',
    campaignAd: 'No vendas noches sueltas: vende experiencias con relato, territorio y retorno comercial.',
    landingMessage: 'Estructuramos tu oferta turística para diferenciarte y captar demanda de valor.',
    callOpening: 'Te llamo para mostrarte cómo subir ocupación con una propuesta experiencial bien empaquetada.'
  },
  {
    niche: 'Gestorías',
    promise: 'Reducir fricción documental y acelerar expedientes compartidos.',
    firstDeliverable: 'Circuito único de documentos, validaciones y alertas de vencimiento.',
    kpi: 'Tiempo de respuesta por expediente.',
    nextStep: 'Integrar CRM de relaciones con documental y legal para trazabilidad total.',
    recommendedAgent: 'ReproDocumentosIA + ReproLegalIA + ReproAgendaIA',
    campaignAd: 'Menos perseguir papeles, más tiempo para asesorar: circuito documental con control total.',
    landingMessage: 'Unifica expedientes, alertas y responsables en una sola operativa de gestoría.',
    callOpening: 'Estoy revisando cómo reducir tiempos de expediente en tu gestoría con un flujo único de documentación.'
  },
  {
    niche: 'Colegios y Campus',
    promise: 'Convertir la formación en proyectos reales con impacto local.',
    firstDeliverable: 'Itinerario formativo con Módulo 0 + práctica aplicada por equipo.',
    kpi: 'Proyectos finalizados por cohorte.',
    nextStep: 'Activar lanzaderas Campus-Empresa con mentores y panel de seguimiento.',
    recommendedAgent: 'ReproCampusIA + ReproFundacionIA',
    campaignAd: 'Formación que aterriza en proyectos reales: del aula al territorio con resultados medibles.',
    landingMessage: 'Conectamos Campus, empresa y fundación para formar constructores de proyectos con criterio.',
    callOpening: 'Quiero compartirte una ruta para que el aprendizaje termine en proyectos reales, no en teoría suelta.'
  }
];

const nicheExecutionPrinciples = [
  'Una oferta clara por nicho, no veinte servicios sin prioridad.',
  'Una métrica principal por sprint para aprender rápido.',
  'Una reunión semanal de decisiones con responsables y fechas.',
  'Un siguiente paso visible para cliente y equipo en cada fase.'
];

const institutionalKnowledgePillars = [
  {
    title: 'Conocimiento aplicado',
    description: 'Cada contenido se diseña para convertirse en una decisión, una acción o un resultado medible.'
  },
  {
    title: 'Método replicable',
    description: 'Lo que funciona en un sector se estructura para poder adaptarse con calidad a otros ecosistemas.'
  },
  {
    title: 'Acompañamiento real',
    description: 'No entregamos solo información: acompañamos procesos completos desde el diagnóstico hasta el impacto.'
  },
  {
    title: 'Memoria institucional',
    description: 'Documentamos aprendizaje, casos y decisiones para construir una institución que mejora con el tiempo.'
  }
];

const editorialFormats = [
  'Libro',
  'Audiolibro',
  'Book trailer',
  'Libro ilustrado',
  'Banda sonora original',
  'Adaptación audiovisual (si surge la oportunidad)'
];

const editorialDifferential = [
  'Escribir con método y acompañamiento',
  'Construir una identidad editorial propia',
  'Publicar con calidad y coherencia',
  'Sostener una comunidad de autores activa'
];

const communityCommitments = [
  'Espacio en preparación para que cada autora y autor forme parte del ecosistema.',
  'Futuras fichas públicas de autor, obra y recorrido editorial.',
  'Participación en lecturas, talleres y lanzamientos colaborativos.',
  'Conexión abierta entre comunidad, escuela y biblioteca viva.'
];

const reproOrigenOfficialMap: Array<{ name: string; description: string; route?: PublicRoute; children?: string[] }> = [
  {
    name: 'Soluciones Empresa',
    description: 'Estrategia y ejecucion por ecosistemas para empresas y organizaciones.',
    route: 'soluciones'
  },
  {
    name: 'Automatización Inteligente',
    description: 'Estructura operativa de agentes y automatizaciones visuales.',
    route: 'automatizacion-inteligente'
  },
  {
    name: 'Biblioteca Viva',
    description: 'Colecciones y obras en evolucion dentro del sello editorial.',
    route: 'biblioteca-viva'
  },
  {
    name: 'Escuela Editorial',
    description: 'Metodo para transformar ideas en proyectos editoriales vivos.',
    route: 'escuela-editorial'
  },
  {
    name: 'Campus',
    description: 'Arquitectura de escuelas y conocimiento aplicable.',
    route: 'campus-reproorigen'
  },
  {
    name: 'Fundación',
    description: 'Impacto territorial, ambiental y social en paralelo al crecimiento.',
    route: 'fundacion'
  },
  {
    name: 'Comunidad',
    description: 'Red de colaboradores, alianzas y cooperacion activa.',
    route: 'comunidad-reproorigen'
  },
  {
    name: 'ALBATOUR',
    description: 'Ecosistema de viajes, aprendizaje y experiencias de territorio.',
    route: 'albatour',
    children: [
      'Viajes Escolares',
      'AMPAs',
      'Colegios',
      'Universidades',
      'Viajes Culturales',
      'Turismo Rural',
      'Experiencias Educativas',
      'Rutas Del Territorio',
      'Generación Alfa',
      'Retiros Y Encuentros'
    ]
  }
];

const ecosystemPillars: Array<{ name: string; description: string; route: PublicRoute }> = [
  {
    name: 'ReproOrigen XXI',
    description: 'Marca principal que articula empresa, territorio e innovacion aplicada.',
    route: 'inicio'
  },
  {
    name: 'Inteligencia Artificial y empresa',
    description: 'Automatizacion inteligente y servicios empresariales con criterio operativo.',
    route: 'automatizacion-inteligente'
  },
  {
    name: 'Editorial y Biblioteca Viva',
    description: 'Obras, colecciones y conocimiento vivo con identidad editorial.',
    route: 'biblioteca-viva'
  },
  {
    name: 'Campus',
    description: 'Escuelas y rutas de aprendizaje para transferencia de conocimiento.',
    route: 'campus-reproorigen'
  },
  {
    name: 'Fundación',
    description: 'Programas de impacto ambiental, social y educativo conectados al territorio.',
    route: 'fundacion'
  },
  {
    name: 'ALBATOUR',
    description: 'Operador de experiencias y viajes con proposito dentro del ecosistema.',
    route: 'albatour'
  }
];

const albatourPurposeExperiences: Array<{ title: string; description: string }> = [
  {
    title: 'Viajes escolares con cuadernos pedagogicos',
    description: 'Programas guiados para centros con materiales didacticos antes, durante y despues del viaje.'
  },
  {
    title: 'Experiencias de reforestacion con la Fundacion',
    description: 'Jornadas de impacto real en territorio con aprendizaje ambiental y seguimiento comunitario.'
  },
  {
    title: 'Rutas literarias inspiradas en Biblioteca Viva',
    description: 'Recorridos narrativos que conectan lectura, paisaje y memoria cultural.'
  },
  {
    title: 'Visitas a empresas con IA y tecnologia',
    description: 'Itinerarios para conocer aplicacion real de innovacion en entornos productivos.'
  },
  {
    title: 'Itinerarios sobre patrimonio y territorio',
    description: 'Experiencias de interpretacion local para colegios, universidades y grupos culturales.'
  },
  {
    title: 'Experiencias para familias',
    description: 'Propuestas intergeneracionales de aprendizaje, naturaleza y convivencia.'
  }
];

const albatourServiceLines: Array<{ name: string; description: string }> = [
  {
    name: 'Viajes escolares',
    description: 'Programacion academica y logistica visual para centros y equipos docentes.'
  },
  {
    name: 'Turismo educativo',
    description: 'Rutas de conocimiento aplicadas a patrimonio, innovacion y territorio.'
  },
  {
    name: 'Familias',
    description: 'Experiencias de fin de semana y periodos lectivos con contenido cultural y ambiental.'
  },
  {
    name: 'Universidades',
    description: 'Programas de inmersion para transferencia, investigacion y cooperacion territorial.'
  },
  {
    name: 'Experiencias territoriales',
    description: 'Diseño de itinerarios locales con identidad propia y proveedores del ecosistema.'
  },
  {
    name: 'Retiros y encuentros',
    description: 'Formatos de pausa, reflexion y aprendizaje con soporte editorial y comunitario.'
  }
];

const knowledgeAreas: Array<{
  title: string;
  description: string;
  areas: string[];
  connections: string[];
}> = [
  {
    title: 'Naturaleza Y Territorio',
    description: 'Conocimiento de base territorial, agrícola y ambiental sostenido por experiencia real y práctica local.',
    areas: [
      'Jardinería',
      'Citricultura',
      'Riego Localizado',
      'Viveros',
      'Sanidad Vegetal',
      'Gestión Del Agua',
      'Biodiversidad',
      'Reforestación',
      'Paisajismo',
      'Educación Ambiental'
    ],
    connections: ['Campus', 'Fundación', 'ALBATOUR', 'Consultoría', 'Proyectos']
  },
  {
    title: 'Inteligencia Artificial',
    description: 'Capacidades operativas para automatización, estrategia y productividad aplicada a empresa real.',
    areas: ['Automatización', 'Arquitectos IA', 'Productividad', 'Marketing', 'CRM', 'Dirección Estratégica'],
    connections: ['Arquitectos IA', 'Campus', 'Consultoría', 'Proyectos', 'Comunidad']
  },
  {
    title: 'Editorial',
    description: 'Arquitectura narrativa y de publicación para construir legado y conocimiento vivo.',
    areas: [
      'Obras Vivas',
      'Biblioteca Viva',
      'Cuentos Terapéuticos',
      'Libros Visuales',
      'Escritura Creativa',
      'Publicación',
      'Comunidad De Autores'
    ],
    connections: ['Editorial', 'Campus', 'ALBATOUR', 'Libros', 'Comunidad']
  },
  {
    title: 'Campus',
    description: 'Escuelas de conocimiento aplicable para formación estructurada por competencias demostrables.',
    areas: ['Empresa', 'IA', 'Educación', 'Turismo', 'Naturaleza', 'Editorial', 'Comunidad'],
    connections: ['Formación', 'Consultoría', 'Arquitectos IA', 'Fundación', 'ALBATOUR']
  },
  {
    title: 'ALBATOUR',
    description: 'Operador de experiencias educativas y territoriales conectado al ecosistema de conocimiento.',
    areas: ['Viajes Escolares', 'Turismo Educativo', 'Experiencias', 'Rutas Del Territorio', 'Familias', 'Universidades'],
    connections: ['ALBATOUR', 'Campus', 'Biblioteca Viva', 'Fundación', 'Proyectos']
  },
  {
    title: 'Fundación',
    description: 'Línea de impacto social y ambiental para activar territorio, investigación y comunidad.',
    areas: ['Voluntariado', 'Reforestación', 'Investigación', 'Generación Alfa', 'Impacto Social', 'Territorio'],
    connections: ['Fundación', 'Campus', 'ALBATOUR', 'Comunidad', 'Proyectos']
  }
];

const knowledgeOutputs = ['Formación', 'Libros', 'Arquitectos IA', 'Consultoría', 'Experiencias', 'Proyectos', 'Comunidad'];

const aiAgents = [
  'Comercial',
  'Subvenciones',
  'Jurídico',
  'Administrativo',
  'Turismo',
  'Energía',
  'Medio Ambiente',
  'Editorial',
  'Fundación'
];

type PublicArchitectureItem = {
  name: string;
  description: string;
  relation?: PublicRoute;
};

const bibliotecaVivaCollections: PublicArchitectureItem[] = [
  { name: 'Biblioteca Viva', description: 'Libros que ayudan a reflexionar y crecer.' },
  { name: '21 Cuentos', description: 'Colección principal.' },
  { name: 'Cuentos Terapéuticos', description: 'Relatos simbólicos para acompañar procesos personales.' },
  { name: 'Libros Visuales', description: 'Historias ilustradas con identidad cinematográfica.' }
];

const editorialRepositoryArchitecture: PublicArchitectureItem[] = [
  { name: '01_OBRAS_VIVAS', description: 'Proyectos editoriales que evolucionan por capítulos y ediciones.' },
  { name: '02_BIBLIOTECA_VIVA', description: 'Colección editorial y continuidad de obras publicadas.' },
  { name: '03_CUENTOS', description: 'Repositorio de relatos y piezas narrativas de colección.' },
  { name: '04_MANUALES', description: 'Guías metodológicas y documentación de procesos editoriales.' },
  { name: '05_CAMPUS', description: 'Materiales de formación para Escuela Editorial y talleres.' },
  { name: '06_METODO_REPROORIGEN', description: 'Marco metodológico vivo aplicado a cada proyecto editorial.' },
  { name: '07_ILUSTRACIONES', description: 'Sistema visual e ilustraciones de personajes, escenas y símbolos.' },
  { name: '08_PORTADAS', description: 'Exploraciones y versiones de cubiertas por obra y colección.' },
  { name: '09_INVESTIGACION', description: 'Fuentes, notas y referencias para construcción de conocimiento.' },
  { name: '10_PUBLICACIONES', description: 'Salidas editoriales y trazabilidad de ediciones publicadas.' }
];

const editorialProjectSections = [
  'Manuscrito',
  'Índice',
  'Cronología',
  'Personajes',
  'Lugares',
  'Ilustraciones',
  'Fotografías',
  'Versiones',
  'Publicación'
];

const editorialSubmissionFormat = [
  'PROYECTO -> La Llegada de la Promesa',
  'MÓDULO -> Capítulo 3',
  'OBJETIVO -> Quiero desarrollar este capítulo.',
  'IDEA -> Quiero que aparezca un río como símbolo.',
  'IMAGEN -> Capítulo 7 / Fotografía del río Mijares.',
  'RECUERDO -> Año 2008 / Lo que ocurrió...',
  'REFLEXIÓN -> Texto libre de reflexión.',
  'ILUSTRACIÓN -> Capítulo 12 / Dirección visual de escena.'
];

const firstLivingWork = {
  title: 'Proyecto Editorial Nº001 · La Llegada de la Promesa',
  author: 'Rebeca Pitarch',
  status: 'En construcción',
  collection: 'Biblioteca Viva',
  territory: 'Burriana, Paris y Lomdres (nombre local)'
};

const fundationalBook = {
  title: 'La Llegada de la Promesa',
  subtitle: 'Bajo la sombra de Sus alas',
  author: 'Rebeca Pitarch',
  synopsis:
    'Una historia de búsqueda, exilio, encuentro y transformación espiritual donde la Promesa atraviesa el dolor para abrir un camino de esperanza.',
  status: 'Obra Viva',
  firstEdition: 'Primera Edición',
  collection: 'Obras Vivas',
  imprint: 'ReproOrigen XXI'
};

const fundationalBookSections = {
  presentation:
    'La Llegada de la Promesa se integra oficialmente como Proyecto Editorial Nº001 y Obra Fundacional de la Editorial ReproOrigen XXI.',
  story:
    'La obra recorre una travesía interior que pasa por la infancia, la búsqueda, el exilio y el encuentro con Jesucristo en un proceso de trece semanas de sanación.',
  author:
    'Rebeca Pitarch, nacida en Burriana (Castellón), desarrolla una narrativa de raíz espiritual, simbólica y territorial, con una voz íntima orientada al legado.',
  bibliotecaViva:
    'La obra forma parte de Biblioteca Viva como proyecto en evolución permanente, con nuevas versiones y capítulos que respetan su origen narrativo.',
  editorial:
    'ReproOrigen XXI presenta esta obra con identidad visual editorial: pergamino, sello de cera, atmósfera cinematográfica y naturaleza como marco estético.'
};

const campusSchools: PublicArchitectureItem[] = [
  { name: 'Escuela de Empresa', description: 'Dirección estratégica, procesos y crecimiento sostenible.' },
  { name: 'Escuela de IA', description: 'Uso práctico de IA para equipos humanos y operaciones reales.' },
  { name: 'Escuela de Turismo', description: 'Diseño de experiencias y propuestas de valor territorial.' },
  { name: 'Escuela de Energia', description: 'Formación sobre eficiencia, rehabilitación y ejecución coordinada.' },
  { name: 'Escuela Juridica', description: 'Marco legal operativo para proyectos, contratos y cumplimiento.' },
  { name: 'Escuela de Educacion', description: 'Metodologías aplicadas para infancia, profesorado y comunidad.' },
  { name: 'Escuela Editorial', description: 'Producción, curación y continuidad de conocimiento en red.', relation: 'escuela-editorial' },
  { name: 'Escuela Comunidad', description: 'Colaboración intersectorial entre empresas, entidades y territorio.', relation: 'comunidad-reproorigen' }
];

const agentCatalog: PublicArchitectureItem[] = [
  { name: 'Arquitecto Comercial', description: 'Estructura comercial de captacion, oportunidad y seguimiento.' },
  { name: 'Arquitecto Juridico', description: 'Soporte de cumplimiento y trazabilidad documental.' },
  { name: 'Arquitecto Subvenciones', description: 'Identificacion y encaje de lineas de ayuda por proyecto.' },
  { name: 'Arquitecto Energia', description: 'Analisis tecnico para rehabilitacion y eficiencia.' },
  { name: 'Arquitecto Turismo', description: 'Activacion de propuesta experiencial y narrativa territorial.' },
  { name: 'Arquitecto Educacion', description: 'Despliegue de programas formativos por audiencias.' },
  { name: 'Arquitecto Editorial', description: 'Curacion de contenidos, colecciones y publicacion estructurada.', relation: 'editorial-reproorigen' },
  { name: 'Arquitecto Legado', description: 'Acompana a conservar historias familiares, empresariales y de territorio que merecen permanecer.', relation: 'escuela-editorial' },
  { name: 'Arquitecto Escritor', description: 'Asistencia para redaccion guiada y consistencia editorial.' },
  { name: 'Arquitecto Investigacion', description: 'Organizacion de hallazgos, fuentes y repositorios de conocimiento.' },
  { name: 'Arquitecto Marketing', description: 'Activacion de mensajes, canales y posicionamiento.' },
  { name: 'Arquitecto CRM', description: 'Orquestacion del ciclo comercial en entorno operativo.' },
  { name: 'Arquitecto ERP', description: 'Soporte de coordinacion de procesos y datos internos.' },
  { name: 'Arquitecto Observatorio', description: 'Seguimiento de indicadores y senales del entorno.' },
  { name: 'Arquitecto Director IA', description: 'Nodo de coordinacion institucional y priorizacion.' }
];

const hierarchyLevels: Array<{ role: string; name: string; mission: string }> = [
  {
    role: 'Director General',
    name: 'EL DIRECTOR',
    mission: 'Coordina todo el ecosistema y define rumbo, ritmo y prioridades.'
  },
  {
    role: 'Consejo',
    name: 'LOS GUARDIANES',
    mission: 'Custodian modulos estructurales: Empresa, Editorial, Campus, Fundacion y Territorio.'
  },
  {
    role: 'Arquitectura Operativa',
    name: 'LOS ARQUITECTOS IA',
    mission: 'Ejecutan trabajo especializado por dominios de negocio y producto.'
  }
];

const architectFamilies: Array<{ title: string; focus: string }> = [
  { title: 'Sembradores', focus: 'Captacion, oportunidades y preparacion de terreno comercial.' },
  { title: 'Guias', focus: 'Atencion al cliente, agenda, acompanamiento y resolucion de dudas.' },
  { title: 'Cronistas', focus: 'Documentacion, contenido, libros y memoria institucional.' },
  { title: 'Exploradores', focus: 'Investigacion, scraping legal, analisis y lectura de mercado.' },
  { title: 'Constructores', focus: 'Automatizaciones, web, CRM e integraciones operativas.' },
  { title: 'Custodios', focus: 'Seguridad, contratos, legal, copias y documentacion critica.' }
];

const ecosystemIdentityMap: Array<{ code: string; meaning: string }> = [
  { code: 'AURI', meaning: 'Atencion' },
  { code: 'ORIGEN', meaning: 'Director IA' },
  { code: 'CRONOS', meaning: 'Agenda y tiempos' },
  { code: 'LUMEN', meaning: 'Contenido y creatividad' },
  { code: 'NEXO', meaning: 'Relaciones y CRM' },
  { code: 'ATLAS', meaning: 'Empresa y estrategia' },
  { code: 'SEMILLA', meaning: 'Captacion' },
  { code: 'HORIZONTE', meaning: 'Investigacion' },
  { code: 'LEGADO', meaning: 'Editorial y Biblioteca Viva' }
];

const communityCollaborators: PublicArchitectureItem[] = [
  { name: 'Empresas', description: 'Núcleo operativo de proyectos y oportunidades compartidas.' },
  { name: 'Arquitectos', description: 'Diseño técnico y coordinación de soluciones de intervención.' },
  { name: 'Gestorias', description: 'Acompañamiento administrativo y marco documental de cliente.' },
  { name: 'Ingenieros', description: 'Validación técnica y soporte de ejecución.' },
  { name: 'Administradores', description: 'Interlocución y gestión de comunidades y edificios.' },
  { name: 'Universidades', description: 'Colaboración académica, transferencia e investigación aplicada.' },
  { name: 'Colegios', description: 'Participación educativa en programas de impacto y territorio.' },
  { name: 'Viveros', description: 'Red verde para proyectos de restauración y biodiversidad.' },
  { name: 'Jardineros', description: 'Ejecución de mantenimiento, plantación y cuidado continuo.' },
  { name: 'Ayuntamientos', description: 'Articulación institucional para programas locales.' },
  { name: 'Fundaciones', description: 'Alianzas de impacto social y ambiental.', relation: 'fundacion' }
];

const foundationAreas: PublicArchitectureItem[] = [
  { name: 'Reforestacion', description: 'Programas de plantación y restauración del territorio.' },
  { name: 'Voluntariado', description: 'Activación de participación ciudadana y corporativa.' },
  { name: 'Generacion Alfa', description: 'Iniciativas para infancia y educación en sostenibilidad.' },
  { name: 'Territorio', description: 'Proyectos de desarrollo local con enfoque de largo plazo.' },
  { name: 'Investigacion', description: 'Medición, aprendizaje y difusión de impacto.' },
  { name: 'Impacto', description: 'Indicadores sociales y ambientales vinculados a proyectos.' },
  { name: 'Eventos', description: 'Jornadas de conexión entre comunidad, educación y empresa.' }
];

const publicEcosystemRoutes: Array<{ route: PublicRoute; label: string }> = [
  { route: 'mapa-conocimiento', label: 'Mapa Conocimiento' },
  { route: 'biblioteca-viva', label: 'Biblioteca Viva' },
  { route: 'escuela-editorial', label: 'Escuela Editorial' },
  { route: 'editorial-reproorigen', label: 'Editorial' },
  { route: 'la-llegada-de-la-promesa', label: 'Obra Fundacional' },
  { route: 'albatour', label: 'ALBATOUR' },
  { route: 'campus-reproorigen', label: 'Campus' },
  { route: 'catalogo-agentes-ia', label: 'Arquitectos IA' },
  { route: 'jerarquia-reproorigen', label: 'Jerarquia' },
  { route: 'comunidad-reproorigen', label: 'Comunidad' },
  { route: 'fundacion', label: 'Fundacion' }
];

const editorialMethodStages = [
  'Descubre tu historia',
  'Organiza tu libro',
  'Escribir',
  'Revisa',
  'Diseñar',
  'Publicar',
  'Comparte tu legado'
];

const editorialAgentSpecialties = [
  'Acompañar al autor',
  'Estructurar capítulos',
  'Revisar coherencia',
  'Ayudar con la identidad del libro',
  'Preparar la publicación'
];

const editorialPhilosophyPrinciples = [
  'No improvisar: cada documento pertenece a un proyecto editorial estructurado.',
  'No escribir para publicar rápido: escribir para construir legado editorial de largo plazo.',
  'La plataforma organiza, relaciona y conserva conocimiento sin sustituir la voz autora.',
  'Cada nueva edición suma valor sin perder la identidad de la obra original.'
];

const obrasVivasManifest =
  'Las Obras Vivas son proyectos editoriales que evolucionan con el tiempo, incorporando nuevos capítulos y nuevas ediciones sin perder la identidad de la obra original.';

const originProgramIndex = [
  'Módulo 1: Los 21 Cuentos - El Despertar del Niño Interior',
  'Módulo 2: La Arquitectura Viva',
  'Módulo 3: La Alquimia de la Materia',
  'Módulo 4: El Legado del Nodo (pendiente de desarrollo)',
  'Prácticas complementarias',
  'La bioquímica del ser',
  'Agradecimientos'
];

const editorialWorkLevels = [
  {
    level: 'Nivel 1 - Libro',
    title: 'El Origen que Despierta',
    description: 'La obra editorial base: voz, relato y estructura narrativa para publicación en Biblioteca Viva.'
  },
  {
    level: 'Nivel 2 - Programa',
    title: 'Acompañamiento completo',
    description: 'El recorrido formativo y vivencial con módulos, prácticas y bitácora de integración.'
  },
  {
    level: 'Nivel 3 - Escuela Editorial',
    title: 'Formación de nuevos autores',
    description: 'El espacio donde otras personas aprenden a transformar experiencia en obra propia.'
  }
];

const chapterTransitions = [
  'Transición I - Del Módulo 1 al Módulo 2: de la memoria íntima al territorio compartido.',
  'Transición II - Del Módulo 2 al Módulo 3: de la convivencia consciente a la transformación de la materia emocional.',
  'Transición III - Del Módulo 3 al cierre: de la práctica personal a la arquitectura de legado en comunidad.'
];

const manuscriptEditorialCommitments = [
  'Manuscrito Editorial v1 con tono unificado y continuidad narrativa.',
  'Índice definitivo manteniendo el orden original de módulos.',
  'Texto preparado para futura maquetación editorial.',
  'Compatibilidad plena con Biblioteca Viva y la arquitectura ReproOrigen XXI.'
];

const editorialCreativeDirection = [
  'Visión en movimiento: cada capítulo se concibe como escena viva, no como bloque estático.',
  'Hilo musical: atmósfera sonora suave para sostener ritmo emocional y continuidad de lectura.',
  'El sello: identidad ReproOrigen XXI en tono, símbolos y coherencia estética editorial.'
];

const heroIllustrationBriefs: Array<{ title: string; scene: string; symbol: string; palette: string }> = [
  {
    title: 'Héroe/Heroína en el Umbral',
    scene: 'Figura en transición entre sombra y claridad, frente a una puerta natural abierta en el bosque.',
    symbol: 'Umbral, raíz y respiración.',
    palette: 'Verdes profundos, tierra cálida y luz dorada suave.'
  },
  {
    title: 'El Retorno a Casa',
    scene: 'El personaje vuelve al centro con postura serena, sosteniendo una luz pequeña y estable.',
    symbol: 'Integración, hogar interno y presencia.',
    palette: 'Ámbar, azul noche y blanco cálido.'
  },
  {
    title: 'La Voz Recuperada',
    scene: 'Héroe/Heroína cantando o pronunciando palabra clara en un claro del bosque con eco armónico.',
    symbol: 'Voz, verdad y coherencia.',
    palette: 'Lavanda, verde musgo y plata tenue.'
  },
  {
    title: 'Guardiana/Guardián del Claro',
    scene: 'Figura cuidando límites sanos del espacio común, con gesto firme y amable.',
    symbol: 'Límite, cuidado y gobernanza ecológica.',
    palette: 'Oliva, cobre y gris piedra.'
  }
];

const cinematicChapterScenes = [
  {
    title: 'Capítulo I · El Umbral',
    subtitle: 'La primera página se abre con niebla suave y una promesa de regreso a casa interior.',
    atmosphere: 'Bruma de amanecer, hojas en deriva y luz dorada en movimiento mínimo.',
    visualClass: 'cinematic-panorama--dawn'
  },
  {
    title: 'Capítulo II · El Bosque Vivo',
    subtitle: 'Las raíces se conectan y aparece la red de cuidado que sostiene la transformación.',
    atmosphere: 'Oscilación de copas, respiración del bosque y destellos de claridad entre ramas.',
    visualClass: 'cinematic-panorama--forest'
  },
  {
    title: 'Capítulo III · El Río que Integra',
    subtitle: 'La historia aprende a fluir: lo que dolía encuentra cauce y dirección.',
    atmosphere: 'Agua lenta, reflejos móviles y una corriente que acompasa la lectura.',
    visualClass: 'cinematic-panorama--river'
  },
  {
    title: 'Capítulo IV · El Sello',
    subtitle: 'Cada cierre deja memoria, no final: el relato permanece vivo para la siguiente apertura.',
    atmosphere: 'Luz de cera, sombra cálida y cierre ceremonial del capítulo.',
    visualClass: 'cinematic-panorama--seal'
  }
];

const bookSignature = 'יֵשׁוּעַ הַמָּשִׁיחַ ✧ רִבְקָה';

const moduleOneStoryBlocks: Array<{ title: string; stories: string[] }> = [
  {
    title: 'Bloque 1 - El Despertar del Niño Interior',
    stories: [
      '1. La Niña Invisible / Los Diminutos',
      '2. El Niño que Olvidó Cómo Aterrizar / Calimero y el Cascarón',
      '3. La Pequeña que Creyó la Mentira / Las Botas del Orgullo',
      '4. La Niña del Espejo Envenenado / La Manzana de la Madrastra',
      '5. El Guardián sin Corona / Las Gadgeto-Defensas',
      '6. La Niña que Aprendió a Quedarse Quieta / El Pinocho sin Voz',
      '7. El Niño que se Tragó la Mentira / El Chivo Expiatorio'
    ]
  },
  {
    title: 'Bloque 2 - Cruzando la Sombra',
    stories: [
      '8. La Niña de la Casa sin Primavera / El Invierno Heredado',
      '9. El Niño del Planeta Propio / El Principito en su Asteroide',
      '10. La Niña que se Armó para No Sentir / La Armadura de Hielo',
      '11. El Niño que Guardó el Rugido / El Dragón del Sótano',
      '12. La Niña que Entregó su Voz / La Sirenita y la Bruja',
      '13. La Niña que Llamó Hogar a la Jaula / El Pájaro Domesticado',
      '14. El Niño que No Sabía que Tenía Suficiente / El Saco sin Fondo'
    ]
  },
  {
    title: 'Bloque 3 - El Retorno del Héroe',
    stories: [
      '15. La Niña que Detuvo el Reloj / El Tiempo Congelado',
      '16. El Niño que Buscaba el Mapa / El Cartógrafo Perdido',
      '17. La Niña que se Juzgó antes que Nadie / El Tribunal Interior',
      '18. La Niña que Cuidó a Todos Menos a Ella / La Cazafantasmas Agotada',
      '19. El Niño de los Mil Disfraces / El Marqués de Carabas',
      '20. La Niña que Alumbró hasta Apagarse / La Vela Consumida',
      '21. El Niño que por Fin Volvió a Casa / El Adulto Integrado'
    ]
  }
];

const moduleOneJournalPrompts = [
  'La Niña Invisible: ¿En qué momento sentí que no me veían y qué hice para sobrevivir a eso?',
  'La Niña que Aprendió a Quedarse Quieta: ¿Qué sigo callando hoy por la misma razón que callé de niño o niña?',
  'La Niña que Cuidó a Todos Menos a Ella: ¿A quién cuido hoy y quién me cuida a mí?',
  'El Niño que por Fin Volvió a Casa: ¿Qué parte de mí ya volvió a casa y qué parte sigue en camino?'
];

const moduleTwoLessons: Array<{ title: string; focus: string; plant: string; summary: string; practice: string; journal: string }> = [
  {
    title: 'Lección 1 - El Guardián del Umbral',
    focus: 'Defensa selectiva',
    plant: 'Melisa',
    summary: 'La energía personal no se protege peleando con todo, sino eligiendo con claridad dónde sí merece invertirse.',
    practice: 'Ante una interacción que desgaste, pausa 5 segundos, respira y pregúntate si eso te nutre o te drena.',
    journal: '¿Me retiro por sabiduría o por miedo aprendido?'
  },
  {
    title: 'Lección 2 - El Claro del Sol',
    focus: 'Límites del entorno',
    plant: 'Salvia Blanca',
    summary: 'Un entorno con límites claros da seguridad al sistema nervioso y mejora presencia, descanso y enfoque.',
    practice: 'Identifica un elemento de tu entorno que te pesa y ordénalo hoy.',
    journal: '¿Qué mantiene mi entorno drenante y qué me impide cambiarlo?'
  },
  {
    title: 'Lección 3 - La Micorriza',
    focus: 'Liderazgo por coherencia',
    plant: 'Lavanda',
    summary: 'Liderar no es imponer ni cargar: es convertirse en un nodo de calma que organiza por resonancia.',
    practice: 'Antes de hablar en grupo, respira, centra el cuerpo y escucha para comprender.',
    journal: '¿Lidero intentando controlar o sosteniendo presencia?'
  },
  {
    title: 'Lección 4 - La Palabra Clara',
    focus: 'Lenguaje honesto',
    plant: 'Tomillo',
    summary: 'Cuando la voz y la verdad interna se alinean, el cuerpo sale del esfuerzo de sostener máscaras.',
    practice: 'Cambia frases automáticas por frases elegidas y da espacio a la voz con sonido libre.',
    journal: '¿Qué quiso decir hoy mi voz que no dejé salir?'
  },
  {
    title: 'Lección 5 - Innovación Biomimética',
    focus: 'Aprender de la naturaleza',
    plant: 'Roble',
    summary: 'Primero observa con profundidad; después actúa con precisión. El método evita la reacción impulsiva.',
    practice: 'Ante un problema, reformula la pregunta: ¿qué es esto realmente?',
    journal: '¿Qué estoy forzando esta semana en lugar de comprender?'
  },
  {
    title: 'Lección 6 - Adaptación y Migración',
    focus: 'Flexibilidad ante el cambio',
    plant: 'Cedro',
    summary: 'Soltar no niega el valor de lo vivido; libera energía para adaptarse a lo que ya cambió.',
    practice: 'Nombra una situación que cambió y escribe la adaptación que ya lograste.',
    journal: '¿A qué me sigo aferrando que ya no está?'
  },
  {
    title: 'Lección 7 - Gobernanza Ecológica',
    focus: 'Cuidar lo compartido',
    plant: 'Mirra',
    summary: 'La sostenibilidad relacional nace cuando cada parte toma lo necesario y también aporta al sistema común.',
    practice: 'Revisa un espacio compartido: identifica qué tomas de más o qué necesitas pedir con claridad.',
    journal: '¿Qué debo al espacio común y qué me debo al pedir lo necesario?'
  }
];

const moduleThreeLessons: Array<{ title: string; focus: string; plant: string; summary: string; journal: string }> = [
  {
    title: 'Lección 8 - El Agua que Cede',
    focus: 'Adaptarse sin perder forma',
    plant: 'Sauce',
    summary: 'Ceder estratégicamente puede ser una forma de avance inteligente cuando empujar solo agota.',
    journal: '¿Qué pared intento empujar y cómo podría rodearla con más inteligencia?'
  },
  {
    title: 'Lección 9 - El Fuego que Cocina, no Quema',
    focus: 'Transformar el enojo en acción',
    plant: 'Jengibre',
    summary: 'La intensidad emocional no es enemiga: necesita cauce para convertirse en acción útil y no en daño.',
    journal: 'Cuando me enojé, ¿exploté, tragué o transformé? ¿Qué sintió mi cuerpo en cada vía?'
  },
  {
    title: 'Lección 10 - La Hoja que se Composta',
    focus: 'El duelo como nutriente',
    plant: 'Ortiga',
    summary: 'Lo perdido puede convertirse en raíz del siguiente ciclo cuando el dolor encuentra tiempo y espacio para ser sentido.',
    journal: '¿Qué pérdida sigo acelerando por prisa de estar bien?'
  }
];

const complementaryPractices: Array<{ category: string; items: string[] }> = [
  {
    category: 'Cuerpo y movimiento',
    items: [
      'Anclaje pélvico con pies firmes y respiración baja.',
      'Movimiento en ocho para liberar tensión acumulada.',
      'Columna como eje de presencia y expansión suave.',
      'Paseo consciente de 15 minutos en silencio.'
    ]
  },
  {
    category: 'Respiración',
    items: [
      'Respiración de caja 4-4-4-4.',
      'Suspiro largo para descargar tensión.'
    ]
  },
  {
    category: 'Voz y sonido',
    items: [
      'Tararear, vocalizar o cantar durante unos minutos.',
      'Música instrumental opcional como ambientación.'
    ]
  },
  {
    category: 'Rituales simbólicos',
    items: [
      'Ritual de devolución de etiquetas impuestas.',
      'Ritual de gratitud y armadura simbólica diaria.',
      'Plantas y vela como apoyo ambiental opcional.'
    ]
  }
];

const biochemistrySupports = [
  {
    title: 'Agua',
    detail: 'Hidratación regular durante el día atendiendo a la sed real y al contexto personal.'
  },
  {
    title: 'Magnesio en alimentación variada',
    detail: 'Frutos secos, semillas, hojas verdes, plátano y chocolate negro dentro de una pauta equilibrada.'
  },
  {
    title: 'Movimiento y respiración',
    detail: 'Caminar, respirar profundo y movilizar el cuerpo para favorecer regulación del sistema nervioso.'
  }
];

const platformLayers = [
  'Capa 1 - El alma: historia personal convertida en propósito y credibilidad.',
  'Capa 2 - Programa humano: cuentos y módulos aplicados en campus y talleres.',
  'Capa 3 - Territorio: proyectos con ayuntamientos, repoblación y desarrollo local.',
  'Capa 4 - Tecnología: arquitectos IA, CRM y despliegue por sectores B2B.'
];

const platformJourney = [
  'Entrada: libro El Origen que Despierta.',
  'Siguiente paso: acceso al campus con módulos completos.',
  'Acompañamiento: talleres en vivo, retiros y sesiones grupales.',
  'Nivel avanzado: formación para ayuntamientos y territorios.'
];

const pendingProgramDevelopment = [
  'Desarrollar el contenido completo de los 21 cuentos del Módulo 1.',
  'Completar el Módulo 3 más allá de la Lección 10.',
  'Desarrollar el Módulo 4: El Legado del Nodo.',
  'Redactar la historia personal en voz propia para la web.',
  'Completar agradecimientos en voz propia.',
  'Completar bitácora de 21 preguntas, una por cuento.',
  'Conectar formulario de contacto con CRM en Misión 002.'
];

const coherenceCriteriaOut = [
  'Pseudociencia y afirmaciones sin base verificable.',
  'Afirmaciones médicas específicas sin evidencia adecuada.',
  'Lenguaje religioso prescriptivo o de cierre doctrinal.',
  'Decretos de certeza absoluta que cierren procesos personales.',
  'Narrativas cerradas sobre el origen del trauma de cada persona.',
  'Protocolos de ayuno sin supervisión médica.',
  'Nombre de personas menores de edad.'
];

const coherenceCriteriaIn = [
  'Metáforas del bosque, raíces, elementos y plantas reales en uso simbólico.',
  'Psicoeducación honesta sobre estrés y cuerpo sin dramatización.',
  'Rituales simbólicos simples y seguros.',
  'Preguntas abiertas de bitácora en lugar de afirmaciones cerradas.',
  'Música instrumental como ambientación sin atribuciones curativas.'
];

const authorProfileBlocks = ['Ficha', 'Biografía', 'Obras', 'Proyectos', 'Colaboraciones'];

const editorialArchitectureFlow = [
  'Biblioteca Viva',
  'Escuela Editorial',
  'Arquitecto Editorial IA',
  'Editorial ReproOrigen XXI',
  'Publicación',
  'Comunidad de Autores'
];

const workFlow = [
  'Diagnóstico inicial',
  'Estudio técnico',
  'Subvenciones y financiación',
  'Proyecto personalizado',
  'Ejecución',
  'Seguimiento',
  'Impacto ambiental y reforestación'
];

const useCases = [
  {
    title: 'Cerámica',
    problem: 'Falta de integración entre producción, ventas y gestión documental en campañas comerciales técnicas.',
    solution: 'ReproOrigen XXI estructura un flujo comercial-técnico para oportunidades, catálogo de soluciones y seguimiento por fases.'
  },
  {
    title: 'Rehabilitación Energética',
    problem: 'Dificultad para coordinar diagnóstico, ayudas, ejecución y comunicación con cliente final.',
    solution: 'ReproOrigen XXI conecta estudio técnico, subvenciones y planificación para ejecutar proyectos con trazabilidad completa.'
  },
  {
    title: 'Comunidades de Propietarios',
    problem: 'Procesos lentos para aprobar actuaciones y baja claridad en la propuesta económica y técnica.',
    solution: 'ReproOrigen XXI traduce la propuesta en un plan comprensible con hitos, financiación y seguimiento operativo.'
  },
  {
    title: 'Turismo',
    problem: 'Oferta poco diferenciada y escasa conexión entre experiencia, comercialización y territorio.',
    solution: 'ReproOrigen XXI diseña itinerarios de valor con narrativa comercial, automatización de captación y medición de impacto.'
  },
  {
    title: 'Agricultura',
    problem: 'Baja digitalización de procesos y dificultad para activar nuevas líneas de ingresos sostenibles.',
    solution: 'ReproOrigen XXI implementa automatización operativa, acceso a ayudas y modelos de colaboración territorial.'
  },
  {
    title: 'Administraciones Públicas',
    problem: 'Necesidad de ejecutar proyectos de impacto con recursos limitados y múltiples actores.',
    solution: 'ReproOrigen XXI aporta metodología, soporte técnico y coordinación para impulsar programas territoriales escalables.'
  }
];

const trustJourney = [
  'Primer contacto',
  'Diagnóstico',
  'Estudio técnico',
  'Búsqueda de subvenciones',
  'Presentación de propuesta',
  'Ejecución',
  'Seguimiento',
  'Impacto social y ambiental'
];

const communityValues = [
  'Colaboración',
  'Innovación',
  'Desarrollo territorial',
  'Formación',
  'Economía circular',
  'Reforestación',
  'Apoyo entre empresas',
  'Compromiso con las próximas generaciones'
];

const transformationCases = [
  {
    title: 'Industria cerámica',
    problem: 'Procesos comerciales y técnicos desconectados que ralentizan la toma de decisiones.',
    solution: 'Estrategia integrada con automatización y coordinación por etapas.',
    benefits: 'Mayor velocidad comercial, trazabilidad y eficiencia operativa.'
  },
  {
    title: 'Energía',
    problem: 'Dificultad para estructurar propuestas técnicas y de financiación de forma clara.',
    solution: 'Diseño de itinerario técnico, subvenciones y ejecución sincronizada.',
    benefits: 'Proyectos viables, mejor conversión y menor fricción con el cliente final.'
  },
  {
    title: 'Turismo',
    problem: 'Oferta poco diferenciada y escasa conexión entre producto y territorio.',
    solution: 'Modelo de valor experiencial con apoyo de IA y narrativa comercial.',
    benefits: 'Mayor posicionamiento, captación de demanda y fidelización.'
  },
  {
    title: 'Comunidades de propietarios',
    problem: 'Lentitud para alinear decisiones técnicas, económicas y administrativas.',
    solution: 'Propuesta estructurada con fases, ayudas y seguimiento.',
    benefits: 'Decisiones más ágiles y ejecución coordinada.'
  },
  {
    title: 'Agricultura',
    problem: 'Baja digitalización y dificultades para activar nuevas oportunidades de negocio.',
    solution: 'Automatización operativa y acompañamiento en programas de apoyo.',
    benefits: 'Mejor productividad y sostenibilidad del modelo productivo.'
  },
  {
    title: 'Administraciones públicas',
    problem: 'Necesidad de coordinar múltiples actores en proyectos de impacto.',
    solution: 'Metodología de trabajo colaborativa con soporte técnico transversal.',
    benefits: 'Mayor capacidad de ejecución y resultados medibles.'
  },
  {
    title: 'Colegios',
    problem: 'Falta de recursos prácticos para unir educación, territorio y sostenibilidad.',
    solution: 'Programas educativos y actividades conectadas con la Fundación.',
    benefits: 'Aprendizaje aplicado y vínculo comunitario.'
  },
  {
    title: 'Universidades',
    problem: 'Desconexión entre conocimiento académico y necesidades reales del entorno.',
    solution: 'Alianzas para proyectos aplicados, innovación y transferencia de valor.',
    benefits: 'Impacto territorial, empleabilidad y colaboración estable.'
  }
];

const allianceProfiles = [
  'Gestorías',
  'Administradores de fincas',
  'Ingenierías',
  'Arquitectos',
  'Constructoras',
  'Empresas instaladoras',
  'Viveros',
  'Jardineros',
  'Universidades',
  'Centros educativos',
  'Ayuntamientos',
  'Agencias de turismo'
];

const methodFlow = [
  'Diagnóstico',
  'Análisis',
  'Subvenciones',
  'Proyecto',
  'Ejecución',
  'Seguimiento',
  'Impacto ambiental',
  'Comunidad ReproOrigen XXI'
];

const communityPillars = [
  'Innovación',
  'Colaboración',
  'Formación',
  'Sostenibilidad',
  'Reforestación',
  'Desarrollo local',
  'Economía circular'
];

const collaborationProfiles = [
  'Gestorías',
  'Administradores de fincas',
  'Arquitectos',
  'Ingenieros',
  'Constructoras',
  'Instaladores',
  'Empresas solares',
  'Empresas de climatización',
  'Viveros',
  'Jardineros',
  'Colegios',
  'Universidades',
  'Ayuntamientos',
  'Agencias de turismo'
];

const faqItems = [
  {
    question: '¿Cómo trabajamos?',
    answer: 'Aplicamos un método por etapas con hitos verificables: diagnóstico, análisis, encaje de ayudas, proyecto, ejecución y seguimiento con indicadores de impacto.'
  },
  {
    question: '¿Qué tipo de empresas pueden colaborar?',
    answer: 'Trabajamos con empresas, profesionales, administraciones y entidades educativas; priorizamos equipos que quieran procesos claros, trazables y orientados a resultados.'
  },
  {
    question: '¿Cómo funcionan los arquitectos IA?',
    answer: 'Los arquitectos IA ejecutan tareas especializadas dentro de un flujo supervisado: organizan información, proponen pasos y aceleran operaciones con control humano.'
  },
  {
    question: '¿Gestionáis subvenciones?',
    answer: 'Sí. Integramos observación de convocatorias, elegibilidad, documentación y seguimiento dentro del proceso completo de propuesta y ejecución.'
  },
  {
    question: '¿Podemos trabajar desde cualquier ciudad?',
    answer: 'Sí. El modelo está diseñado para colaboración distribuida, con trazabilidad de tareas y coordinación entre equipos en distintos territorios.'
  },
  {
    question: '¿Qué hace la Fundación?',
    answer: 'La Fundación impulsa reforestación, educación y desarrollo territorial, conectando empresas, comunidad y proyectos con impacto social y ambiental.'
  },
  {
    question: '¿Qué ofrece la Escuela Editorial?',
    answer: 'Acompaña a cualquier autor desde la idea hasta la publicación, con método, identidad editorial y comunidad de autores en Biblioteca Viva.'
  }
];

const valueFlow = ['Diagnostico', 'Analisis IA', 'Subvenciones', 'Propuesta', 'Proyecto', 'Seguimiento', 'Impacto ambiental'];

const impactCards = [
  { title: 'Empresas acompanadas', value: '128' },
  { title: 'Municipios', value: '37' },
  { title: 'Arboles plantados', value: '4.260' },
  { title: 'Proyectos activos', value: '54' },
  { title: 'Sectores', value: '19' },
  { title: 'Arquitectos IA', value: '9' },
  { title: 'Comunidad', value: '1.150 miembros' }
];

const ecosystemStatus = [
  { area: 'Web', status: '🟢 Operativo' },
  { area: 'Relaciones', status: '🟢 Operativo' },
  { area: 'ERP', status: '🟢 Operativo' },
  { area: 'Observatorio', status: '🟢 Operativo' },
  { area: 'Juridico', status: '🟡 En desarrollo' },
  { area: 'Timeline', status: '🟡 En desarrollo' },
  { area: 'Fundacion', status: '🟢 Operativo' },
  { area: 'Biblioteca Viva', status: '🟢 Operativo' },
  { area: 'Campus', status: '🟡 En desarrollo' },
  { area: 'Comunidad', status: '🟢 Operativo' }
];

const executiveBlocks: Array<{ title: string; route: PublicRoute; indicators: Array<{ name: string; value: string }> }> = [
  {
    title: 'Area Comercial',
    route: 'portal-cliente',
    indicators: [
      { name: 'Oportunidades', value: '42' },
      { name: 'Clientes', value: '128' },
      { name: 'Presupuestos', value: '67' },
      { name: 'Proyectos', value: '54' },
      { name: 'Contratos', value: '31' },
      { name: 'Facturas', value: '89' },
      { name: 'Cobros', value: '76' }
    ]
  },
  {
    title: 'Area Financiera',
    route: 'portal-cliente',
    indicators: [
      { name: 'Facturacion mensual', value: '94.500 EUR' },
      { name: 'Cobrado', value: '76.300 EUR' },
      { name: 'Pendiente', value: '18.200 EUR' },
      { name: 'Tesoreria', value: 'Estable' },
      { name: 'Ingresos acumulados', value: '642.000 EUR' }
    ]
  },
  {
    title: 'Area Observatorio',
    route: 'impacto',
    indicators: [
      { name: 'Ayudas', value: '26' },
      { name: 'Licitaciones', value: '14' },
      { name: 'Alertas', value: '48' },
      { name: 'Convocatorias', value: '21' }
    ]
  },
  {
    title: 'Area Fundacion',
    route: 'fundacion',
    indicators: [
      { name: 'Arboles comprometidos', value: '5.000' },
      { name: 'Empresas participantes', value: '96' },
      { name: 'Municipios', value: '37' },
      { name: 'Jornadas previstas', value: '12' }
    ]
  },
  {
    title: 'Area Comunidad',
    route: 'nuestra-comunidad',
    indicators: [
      { name: 'Colaboradores', value: '214' },
      { name: 'Gestorias', value: '41' },
      { name: 'Arquitectos', value: '67' },
      { name: 'Instaladores', value: '58' },
      { name: 'Viveros', value: '18' },
      { name: 'Jardineros', value: '54' },
      { name: 'Colegios', value: '33' },
      { name: 'Universidades', value: '7' }
    ]
  },
  {
    title: 'Area Biblioteca Viva',
    route: 'biblioteca-viva',
    indicators: [
      { name: 'Libros', value: '1' },
      { name: 'Cuentos', value: '21' },
      { name: 'Recursos', value: '12' },
      { name: 'Proyectos editoriales', value: '4' }
    ]
  },
  {
    title: 'Area Campus',
    route: 'centro-configuracion',
    indicators: [
      { name: 'Cursos', value: '8' },
      { name: 'Agentes educativos', value: '5' },
      { name: 'Investigaciones', value: '3' },
      { name: 'Convenios', value: '6' }
    ]
  },
  {
    title: 'Agenda Direccion',
    route: 'reservar-reunion',
    indicators: [
      { name: 'Proximas reuniones', value: '8' },
      { name: 'Proximas demostraciones', value: '5' },
      { name: 'Proximas visitas', value: '4' }
    ]
  }
];

const weeklyDirectionRitual = {
  name: 'DIA REPROORIGEN XXI(R)',
  subtitle: 'Consejo de Direccion Semanal',
  intro:
    'Cada lunes comienza una nueva construccion. Antes de crear, nos detenemos para dirigir. Duracion recomendada: 30 minutos.',
  sections: [
    {
      title: 'I. Horizonte de la Semana',
      points: [
        'Definir una unica mision semanal.',
        'Acordar el objetivo principal de la semana.',
        'Marcar tres resultados medibles y una prioridad absoluta.',
        'Pregunta del Director: que debe estar construido el viernes para que la semana merezca la pena.'
      ]
    },
    {
      title: 'II. Pulso del Ecosistema',
      points: [
        'Revisar nuevas oportunidades, reuniones agendadas y propuestas enviadas.',
        'Contrastar proyectos iniciados y acuerdos alcanzados.',
        'Interpretar el momento del ecosistema, no solo las cifras.'
      ]
    },
    {
      title: 'III. Estado de las Construcciones',
      points: [
        'Asignar estado por proyecto: En avance, Requiere apoyo o Necesita desbloqueo.',
        'Todo bloqueo debe tener responsable, proximo paso y fecha prevista.'
      ]
    },
    {
      title: 'IV. Consejo de Arquitectos IA',
      points: [
        'Revisar arquitectos activos y nuevos arquitectos previstos.',
        'Validar automatizaciones de la semana y flujos pendientes de conectar.',
        'Registrar mejoras detectadas para ejecucion inmediata.'
      ]
    },
    {
      title: 'V. Fundacion e Impacto',
      points: [
        'Responder a quien hemos ayudado esta semana.',
        'Identificar que valor hemos creado.',
        'Medir que impacto dejamos en el territorio.'
      ]
    },
    {
      title: 'VI. Aprendizaje de la Semana',
      points: [
        'Registrar un acierto.',
        'Registrar un aprendizaje.',
        'Registrar una mejora para el futuro y trasladarla a Biblioteca Viva.'
      ]
    },
    {
      title: 'VII. Compromiso',
      points: [
        'Cerrar con una decision estrategica para la semana.',
        'Definir una accion en 24 horas que se ejecuta antes de finalizar el dia siguiente.'
      ]
    }
  ],
  closingMessage:
    'La direccion ha sido definida. El equipo conoce el camino. Los Arquitectos IA estan preparados. Comienza una nueva semana de construccion.'
};

const officialDirectionRituals: Array<{ title: string; frequency: string; duration: string; purpose: string }> = [
  {
    title: '06:34 - El Origen Despierta',
    frequency: 'Todos los dias',
    duration: '30 minutos',
    purpose: 'Direccion consciente antes de abrir correo, WhatsApp o mensajes.'
  },
  {
    title: 'DIA REPROORIGEN XXI',
    frequency: 'Todos los lunes',
    duration: '30 minutos',
    purpose: 'Direccion estrategica semanal y foco de construccion.'
  },
  {
    title: 'Viernes de Legado',
    frequency: 'Todos los viernes',
    duration: '20 minutos',
    purpose: 'Revision de logros, aprendizajes y reconocimiento del equipo.'
  },
  {
    title: 'Consejo del Primer Dia del Mes',
    frequency: 'Primer dia de cada mes',
    duration: '90 minutos',
    purpose: 'Revision estrategica completa, nuevos objetivos y evolucion del ecosistema.'
  }
];

const dawnOfficialSchedule = {
  title: 'Horario Oficial ReproOrigen XXI(R)',
  subtitle: '06:34 - El Despertar',
  principle: 'No se abre el correo. No se abre WhatsApp. No se responde a nadie. Primero se dirige.',
  duration: '30 minutos',
  blocks: [
    {
      range: '06:34 - 06:39',
      title: 'Silencio y Direccion',
      actions: [
        'Leer la mision de ReproOrigen XXI.',
        'Revisar la vision.',
        'Recordar por que existe el proyecto.'
      ]
    },
    {
      range: '06:39 - 06:44',
      title: 'Horizonte',
      actions: [
        'Definir el objetivo unico del dia.',
        'Definir el objetivo unico de la semana.',
        'Acordar tres resultados medibles.'
      ]
    },
    {
      range: '06:44 - 06:54',
      title: 'Sala de Direccion',
      actions: [
        'Revisar estado de proyectos.',
        'Tomar pulso comercial.',
        'Revisar Arquitectos IA, bloqueos y prioridades.'
      ]
    },
    {
      range: '06:54 - 07:00',
      title: 'Decision',
      actions: [
        'Tomar una decision estrategica.',
        'Definir una accion obligatoria antes de las 10:00.'
      ]
    },
    {
      range: '07:00 - 07:04',
      title: 'Comienza la Construccion',
      actions: ['Abrir la plataforma.', 'Empezar la primera mision del dia.']
    }
  ],
  dawnMotto: 'Mientras otros comienzan a trabajar, nosotros comenzamos a construir.',
  mondaySignature: [
    '06:34 - El Origen Despierta.',
    'ReproOrigen XXI(R)',
    'Las grandes obras se construyen dia a dia, sin perder nunca el origen.'
  ]
};

type DawnChecklistItem = {
  id: string;
  block: string;
  task: string;
};

type WeeklyActa = {
  weekKey: string;
  label: string;
  objective: string;
  strategicDecision: string;
  action24h: string;
  results: string;
  learnings: string;
  architectsStatus: string;
  reflectionBuilt: string;
  reflectionLearned: string;
  reflectionLegacy: string;
  createdAt: string;
  closedAt: string;
  durationMinutes: number;
  ritualState: 'Sembrando' | 'Construyendo' | 'Consolidado';
};

type FiscalDashboardConfig = {
  currency: 'EUR';
  overdueThresholdDays: number;
  initialCash: number;
};

const weeklyActaStorageKey = 'reproorigen:historial-semanal-direccion';
const fiscalDashboardConfigKey = 'reproorigen:fiscal-dashboard:config';

const defaultFiscalDashboardConfig: FiscalDashboardConfig = {
  currency: 'EUR',
  overdueThresholdDays: 7,
  initialCash: 15000
};

const weekLabelFromDate = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const weekNumber = Math.ceil(dayOfYear / 7);
  return `Semana ${weekNumber}`;
};

const toClockTime = (isoString: string) => {
  if (!isoString) {
    return 'Pendiente';
  }

  const parsed = new Date(isoString);
  return parsed.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

const minutesBetween = (startIso: string, endIso: string) => {
  if (!startIso || !endIso) {
    return 0;
  }

  return Math.max(0, Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000));
};

const dawnChecklistItems: DawnChecklistItem[] = [
  { id: 'silencio-mision', block: '06:34 - 06:39', task: 'Leer la mision de ReproOrigen XXI.' },
  { id: 'silencio-vision', block: '06:34 - 06:39', task: 'Revisar la vision.' },
  { id: 'silencio-origen', block: '06:34 - 06:39', task: 'Recordar por que existe el proyecto.' },
  { id: 'horizonte-dia', block: '06:39 - 06:44', task: 'Definir el objetivo unico del dia.' },
  { id: 'horizonte-semana', block: '06:39 - 06:44', task: 'Definir el objetivo unico de la semana.' },
  { id: 'horizonte-metricas', block: '06:39 - 06:44', task: 'Acordar tres resultados medibles.' },
  { id: 'sala-proyectos', block: '06:44 - 06:54', task: 'Revisar estado de proyectos.' },
  { id: 'sala-comercial', block: '06:44 - 06:54', task: 'Tomar pulso comercial.' },
  { id: 'sala-ia', block: '06:44 - 06:54', task: 'Revisar Arquitectos IA, bloqueos y prioridades.' },
  { id: 'decision-estrategica', block: '06:54 - 07:00', task: 'Tomar una decision estrategica.' },
  { id: 'decision-1000', block: '06:54 - 07:00', task: 'Definir una accion obligatoria antes de las 10:00.' },
  { id: 'comienzo-plataforma', block: '07:00 - 07:04', task: 'Abrir la plataforma.' },
  { id: 'comienzo-mision', block: '07:00 - 07:04', task: 'Empezar la primera mision del dia.' }
];

const buildDawnChecklistSeed = (): Record<string, boolean> =>
  dawnChecklistItems.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

function isPublicRoute(route: string | null): route is PublicRoute {
  return route !== null && (publicRoutes as readonly string[]).includes(route);
}

function PublicTopNav({ currentRoute, isOpen, onNavigate }: { currentRoute: PublicRoute; isOpen: boolean; onNavigate: (route: PublicRoute) => void }) {
  const primaryRoutes: PublicRoute[] = ['inicio', 'soluciones', 'mapa-conocimiento', 'biblioteca-viva', 'editorial-reproorigen', 'contacto'];
  const ecosystemRoutes: PublicRoute[] = [
    'escuela-editorial',
    'la-llegada-de-la-promesa',
    'albatour',
    'campus-reproorigen',
    'catalogo-agentes-ia',
    'jerarquia-reproorigen',
    'comunidad-reproorigen',
    'fundacion'
  ];

  const activeEcosystem = ecosystemRoutes.includes(currentRoute);

  return (
    <nav className={`public-nav ${isOpen ? 'is-open' : ''}`}>
      <div className="public-nav__primary">
        {primaryRoutes.map((route) => (
          <button key={route} type="button" className={currentRoute === route ? 'active' : ''} onClick={() => onNavigate(route)}>
            {routeLabels[route]}
          </button>
        ))}
      </div>
      <details className={`public-nav__ecosystem ${activeEcosystem ? 'is-active' : ''}`}>
        <summary>Ecosistema</summary>
        <div className="public-nav__dropdown">
          {ecosystemRoutes.map((route) => (
            <button key={route} type="button" className={currentRoute === route ? 'active' : ''} onClick={() => onNavigate(route)}>
              {routeLabels[route]}
            </button>
          ))}
        </div>
      </details>
    </nav>
  );
}

function PublicEcosystemNav({ currentRoute, onNavigate }: { currentRoute: PublicRoute; onNavigate: (route: PublicRoute) => void }) {
  return (
    <section className="public-ecosystem-nav" aria-label="Navegacion ecosistema publico">
      <p className="public-kicker">Ecosistema Publico ReproOrigen XXI</p>
      <div className="public-nav">
        {publicEcosystemRoutes.map((item) => (
          <button
            key={item.route}
            type="button"
            className={currentRoute === item.route ? 'active' : ''}
            onClick={() => onNavigate(item.route)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function PublicContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Formulario validado. Preparado para conectar con CRM en la siguiente misión.');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Formulario de contacto</h3>
      <p>Captura visual preparada para integración CRM.</p>
      {status ? <p className="public-form__status">{status}</p> : null}
      <input name="nombre" placeholder="Nombre" minLength={2} required />
      <input name="empresa" placeholder="Empresa" minLength={2} required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="telefono" type="tel" placeholder="Teléfono" pattern="^[0-9+()\s-]{7,20}$" title="Introduce un teléfono válido." required />
      <input name="sector" placeholder="Sector" minLength={2} required />
      <input name="necesidad" placeholder="Qué necesitas" minLength={4} required />
      <textarea name="mensaje" placeholder="Mensaje" rows={5} minLength={10} required />
      <button type="submit">Contactar</button>
    </form>
  );
}

function MeetingReservationCard() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Solicitud registrada. Componente preparado para conectar con calendario en la siguiente misión.');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Reservar reunión</h3>
      <p>Componente visual listo para futura integración con calendario.</p>
      {status ? <p className="public-form__status">{status}</p> : null}
      <input name="nombre" placeholder="Nombre" minLength={2} required />
      <input name="empresa" placeholder="Empresa" minLength={2} required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="fecha" type="date" placeholder="Fecha preferida" required />
      <textarea name="objetivo" placeholder="Objetivo de la reunión" rows={4} minLength={8} required />
      <button type="submit">Reservar reunión</button>
    </form>
  );
}

function DemoMeetingForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Formulario validado. Pendiente de conexion con calendario.');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Reservar reunion</h3>
      <p>Formulario visual de demostracion sin conexion backend.</p>
      {status ? <p className="public-form__status">{status}</p> : null}
      <input name="nombre" placeholder="Nombre" minLength={2} required />
      <input name="empresa" placeholder="Empresa" minLength={2} required />
      <input name="sector" placeholder="Sector" minLength={2} required />
      <input name="municipio" placeholder="Municipio" minLength={2} required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="telefono" type="tel" placeholder="Telefono" pattern="^[0-9+()\s-]{7,20}$" title="Introduce un teléfono válido." required />
      <input name="fecha" type="date" placeholder="Fecha preferida" required />
      <textarea name="comentarios" placeholder="Comentarios" rows={4} minLength={8} required />
      <button type="submit">Reservar reunion</button>
    </form>
  );
}

function CollaborateForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Formulario visual enviado. Preparado para integración en fase posterior.');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Formulario de colaboración</h3>
      <p>Registro visual para colaboradores del ecosistema ReproOrigen XXI.</p>
      {status ? <p className="public-form__status">{status}</p> : null}
      <input name="nombre" placeholder="Nombre" minLength={2} required />
      <input name="empresa" placeholder="Empresa" minLength={2} required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="perfil" placeholder="Perfil de colaboración" minLength={3} required />
      <textarea name="mensaje" placeholder="Cómo te gustaría colaborar" rows={4} minLength={10} required />
      <button type="submit">Contactar</button>
    </form>
  );
}

function NicheActivationForm() {
  const [status, setStatus] = useState('');
  const [selectedNiche, setSelectedNiche] = useState(priorityNicheSprints[0]?.niche ?? '');

  const activeNiche = priorityNicheSprints.find((item) => item.niche === selectedNiche) ?? priorityNicheSprints[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(`Solicitud preparada para ${activeNiche.niche}. Equipo comercial notificado para activar el siguiente paso.`);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Activar nicho prioritario</h3>
      <p>Formulario de activacion comercial con narrativa y arquitecto recomendado por sector.</p>
      {status ? <p className="public-form__status">{status}</p> : null}

      <label htmlFor="niche-select">Nicho</label>
      <select id="niche-select" name="niche" value={selectedNiche} onChange={(event) => setSelectedNiche(event.target.value)} required>
        {priorityNicheSprints.map((item) => (
          <option key={item.niche} value={item.niche}>
            {item.niche}
          </option>
        ))}
      </select>

      <input name="empresa" placeholder="Empresa" minLength={2} required />
      <input name="responsable" placeholder="Responsable" minLength={2} required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="telefono" type="tel" placeholder="Telefono" pattern="^[0-9+()\s-]{7,20}$" title="Introduce un teléfono válido." required />

      <input name="agente" value={activeNiche.recommendedAgent} readOnly />
      <textarea key={`landing-${activeNiche.niche}`} name="mensaje" defaultValue={activeNiche.landingMessage} rows={3} minLength={10} required />
      <textarea key={`opening-${activeNiche.niche}`} name="apertura" defaultValue={activeNiche.callOpening} rows={3} minLength={10} required />

      <button type="submit">Activar nicho</button>
    </form>
  );
}

function PublicFooter({ onNavigate }: { onNavigate: (route: PublicRoute) => void }) {
  return (
    <footer className="public-footer">
      <div>
        <strong>{publicConfig.companyName}</strong>
        <p>{publicConfig.entities.foundation}</p>
        <p>{publicConfig.entities.bibliotecaViva}</p>
        <p>{publicConfig.entities.albatour}</p>
      </div>
      <div className="public-footer__links">
        <button type="button" onClick={() => onNavigate('aviso-legal')}>Aviso Legal</button>
        <button type="button" onClick={() => onNavigate('privacidad')}>Privacidad</button>
        <button type="button" onClick={() => onNavigate('cookies')}>Cookies</button>
        <button type="button" onClick={() => onNavigate('contacto')}>Contacto</button>
      </div>
      <div className="public-footer__institutional">
        <p>{publicConfig.slogan}</p>
        <p>Construyendo oportunidades para empresas, personas y territorios.</p>
      </div>
      <p className="public-footer__social">{publicConfig.corporateEmail} · {publicConfig.phone}</p>
      <p className="public-footer__signature" aria-label="Firma del libro">
        <span lang="he" dir="rtl">{bookSignature}</span>
      </p>
    </footer>
  );
}

function ConfigCenterView() {
  const sections = [
    {
      title: 'Empresa',
      details: [`Nombre: ${publicConfig.companyName}`, `Dominio: ${publicConfig.domain}`, `Direccion: ${publicConfig.address}`]
    },
    {
      title: 'Fundacion',
      details: [`Entidad: ${publicConfig.entities.foundation}`, 'Orientacion: impacto ambiental, educacion y territorio.']
    },
    {
      title: 'Biblioteca Viva',
      details: [`Entidad: ${publicConfig.entities.bibliotecaViva}`, 'Estado: pagina publica inspiracional activa.']
    },
    {
      title: 'Albatour',
      details: [`Entidad: ${publicConfig.entities.albatour}`, 'Rol: ecosistema de colaboracion y turismo.']
    },
    {
      title: 'Contacto',
      details: [`Email: ${publicConfig.corporateEmail}`, `Telefono: ${publicConfig.phone}`]
    },
    {
      title: 'Redes Sociales',
      details: [
        `LinkedIn: ${publicConfig.social.linkedin}`,
        `Instagram: ${publicConfig.social.instagram}`,
        `YouTube: ${publicConfig.social.youtube}`,
        `X: ${publicConfig.social.x}`
      ]
    },
    {
      title: 'SEO',
      details: [
        `Title base: ${publicConfig.seo.defaultTitle}`,
        `Description base: ${publicConfig.seo.defaultDescription}`,
        `Logo: ${publicConfig.logo}`
      ]
    }
  ];

  return (
    <section className="public-panel public-panel--stack">
      <h1>Preferencias del Proyecto</h1>
      <p>Vista interna de solo lectura para revisar configuracion publica reutilizable.</p>
      <div className="public-grid public-grid--cases">
        {sections.map((section) => (
          <article key={section.title} className="public-card">
            <h2>{section.title}</h2>
            {section.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta({ onNavigate }: { onNavigate: (route: PublicRoute) => void }) {
  return (
    <section className="public-panel public-panel--cta">
      <h2>Da el siguiente paso con ReproOrigen XXI</h2>
      <p>Conecta con el equipo y activa tu hoja de ruta con confianza, innovación y propósito.</p>
      <div className="public-hero__actions">
        <button type="button" className="public-button public-button--primary" onClick={() => onNavigate('solicitar-diagnostico')}>
          Solicitar diagnóstico
        </button>
        <button type="button" className="public-button public-button--secondary" onClick={() => onNavigate('reservar-reunion')}>
          Reservar reunión
        </button>
      </div>
    </section>
  );
}

function CinematicChapterExperience() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const stopAmbient = () => {
    oscillatorsRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {
        // Oscillator can already be stopped during rapid toggles.
      }
      node.disconnect();
    });
    gainNodesRef.current.forEach((node) => node.disconnect());

    if (lfoRef.current) {
      try {
        lfoRef.current.stop();
      } catch {
        // LFO can already be stopped during rapid toggles.
      }
      lfoRef.current.disconnect();
    }

    oscillatorsRef.current = [];
    gainNodesRef.current = [];
    lfoRef.current = null;

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const startAmbient = async () => {
    if (audioContextRef.current) {
      return;
    }

    const AudioCtx = window.AudioContext;
    if (!AudioCtx) {
      return;
    }

    const ctx = new AudioCtx();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.03;
    masterGain.connect(ctx.destination);

    const frequencies = [174, 261.63, 329.63];
    frequencies.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = index === 0 ? 'sine' : 'triangle';
      osc.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.012 : 0.007;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscillatorsRef.current.push(osc);
      gainNodesRef.current.push(gain);
    });

    const lfo = ctx.createOscillator();
    const lfoDepth = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.07;
    lfoDepth.gain.value = 0.007;
    lfo.connect(lfoDepth);
    lfoDepth.connect(masterGain.gain);
    lfo.start();
    lfoRef.current = lfo;
  };

  useEffect(() => {
    if (soundEnabled) {
      void startAmbient();
    } else {
      stopAmbient();
    }

    return () => {
      stopAmbient();
    };
  }, [soundEnabled]);

  return (
    <section className="public-panel public-panel--stack">
      <h2>Cuento cinematográfico vivo</h2>
      <p>Cada capítulo se presenta como una página ilustrada en movimiento: panorámica, atmósfera sutil, texto progresivo y cierre con sello de cera.</p>
      <div className="public-hero__actions">
        <button
          type="button"
          className={soundEnabled ? 'public-button public-button--primary' : 'public-button public-button--secondary'}
          onClick={() => setSoundEnabled((value) => !value)}
        >
          {soundEnabled ? 'Desactivar música ambiental' : 'Activar música ambiental opcional'}
        </button>
      </div>
      <div className="cinematic-chapter-grid">
        {cinematicChapterScenes.map((chapter, index) => (
          <article key={chapter.title} className="cinematic-chapter-card">
            <div className={`cinematic-panorama ${chapter.visualClass}`} aria-hidden="true">
              <span className="cinematic-layer cinematic-layer--mist" />
              <span className="cinematic-layer cinematic-layer--leaves" />
              <span className="cinematic-layer cinematic-layer--light" />
              <span className="cinematic-layer cinematic-layer--water" />
            </div>
            <div className="cinematic-text-block">
              <p className="cinematic-reveal" style={{ animationDelay: `${0.1 + index * 0.08}s` }}>Página {index + 1}</p>
              <h3 className="cinematic-reveal" style={{ animationDelay: `${0.22 + index * 0.08}s` }}>{chapter.title}</h3>
              <p className="cinematic-reveal" style={{ animationDelay: `${0.34 + index * 0.08}s` }}>{chapter.subtitle}</p>
              <p className="cinematic-reveal" style={{ animationDelay: `${0.46 + index * 0.08}s` }}>{chapter.atmosphere}</p>
            </div>
            <footer className="cinematic-seal">Sello de cera · Cierre de capítulo</footer>
          </article>
        ))}
      </div>
    </section>
  );
}

type ClientPortalSection =
  | 'mis-proyectos'
  | 'mis-presupuestos'
  | 'mis-facturas'
  | 'mis-documentos'
  | 'mis-contratos'
  | 'mis-subvenciones'
  | 'mis-reuniones'
  | 'mi-impacto-ambiental';

const clientPortalSections: Array<{ key: ClientPortalSection; label: string }> = [
  { key: 'mis-proyectos', label: 'Mis proyectos' },
  { key: 'mis-presupuestos', label: 'Mis presupuestos' },
  { key: 'mis-facturas', label: 'Mis facturas' },
  { key: 'mis-documentos', label: 'Mis documentos' },
  { key: 'mis-contratos', label: 'Mis contratos' },
  { key: 'mis-subvenciones', label: 'Mis subvenciones' },
  { key: 'mis-reuniones', label: 'Mis reuniones' },
  { key: 'mi-impacto-ambiental', label: 'Mi impacto ambiental' }
];

const clientPortalSimulatedData: Record<ClientPortalSection, Array<{ title: string; value: string; note: string }>> = {
  'mis-proyectos': [
    { title: 'Proyecto activo', value: 'Rehabilitación energética · Fase 2', note: 'Ejecución en curso y seguimiento semanal.' }
  ],
  'mis-presupuestos': [
    { title: 'Estado del presupuesto', value: 'Aprobado pendiente de firma', note: 'Actualizado hace 2 días.' }
  ],
  'mis-facturas': [
    { title: 'Estado de facturas', value: '1 emitida · 1 pendiente', note: 'Próximo vencimiento en 8 días.' }
  ],
  'mis-documentos': [
    { title: 'Documentación', value: '12 documentos disponibles', note: 'Incluye informes técnicos y anexos.' }
  ],
  'mis-contratos': [
    { title: 'Contratos', value: 'Borrador en revisión', note: 'Listo para validación final.' }
  ],
  'mis-subvenciones': [
    { title: 'Estado subvenciones', value: 'Expediente presentado', note: 'En evaluación administrativa.' }
  ],
  'mis-reuniones': [
    { title: 'Próxima reunión', value: 'Jueves · 10:30', note: 'Revisión de hitos y próximos pasos.' }
  ],
  'mi-impacto-ambiental': [
    { title: 'Árboles asociados al proyecto', value: '42 árboles', note: 'Impacto vinculado a la Fundación ReproOrigen XXI.' }
  ]
};

function ClientPortalView() {
  const [activeSection, setActiveSection] = useState<ClientPortalSection>('mis-proyectos');

  const dashboardCards = [
    { title: 'Proyecto activo', value: 'Rehabilitación energética · Fase 2' },
    { title: 'Próxima reunión', value: 'Jueves · 10:30' },
    { title: 'Estado del presupuesto', value: 'Aprobado pendiente de firma' },
    { title: 'Estado de facturas', value: '1 emitida · 1 pendiente' },
    { title: 'Estado subvenciones', value: 'Expediente presentado' },
    { title: 'Árboles asociados al proyecto', value: '42 árboles' }
  ];

  return (
    <section className="public-panel public-panel--stack">
      <h1>Relaciones</h1>
      <p>Acceso visual al area de relaciones del cliente con estructura preparada para conectar autenticacion en la siguiente fase.</p>

      <div className="public-nav">
        {clientPortalSections.map((section) => (
          <button
            key={section.key}
            type="button"
            className={activeSection === section.key ? 'active' : ''}
            onClick={() => setActiveSection(section.key)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <section className="public-panel public-panel--stack">
        <h2>Sala de Direccion del Proyecto</h2>
        <div className="public-grid public-grid--cases">
          {dashboardCards.map((card) => (
            <article key={card.title} className="public-card">
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-panel public-panel--stack">
        <h2>{clientPortalSections.find((section) => section.key === activeSection)?.label}</h2>
        <div className="public-grid">
          {clientPortalSimulatedData[activeSection].map((item) => (
            <article key={item.title} className="public-card">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function AccessConditionsGate({ onAccept }: { onAccept: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accepted) {
      setStatus('Debes aceptar las condiciones para continuar.');
      return;
    }

    window.localStorage.setItem('reproorigen:editorial-access-accepted', 'true');
    window.localStorage.setItem(
      'reproorigen:editorial-access-profile',
      JSON.stringify({ fullName, email, acceptedAt: new Date().toISOString() })
    );
    setStatus('Acceso autorizado. Bienvenida al Jardin del Origen.');
    onAccept();
  };

  return (
    <section className="access-gate" aria-label="Acceso con aceptación de condiciones">
      <div className="access-gate__panel">
        <p className="public-kicker">Editorial ReproOrigen XXI</p>
        <h1>Acceso con aceptación de condiciones</h1>
        <p>
          Antes de entrar debes confirmar que has leído y aceptas las condiciones de uso, protección de obra y legado intelectual
          de Biblioteca Viva.
        </p>

        <article className="access-gate__terms" aria-label="Condiciones de uso">
          <h2>Condiciones esenciales</h2>
          <ul className="public-tree-list">
            <li>La obra y su contenido están protegidos por derechos de propiedad intelectual.</li>
            <li>No se permite copia, distribución, adaptación ni explotación sin autorización escrita previa.</li>
            <li>No se permite uso total o parcial para entrenamiento de sistemas de inteligencia artificial sin autorización.</li>
            <li>Solo se permite cita breve con fines legales permitidos y atribución expresa a la autora y editorial.</li>
          </ul>
        </article>

        <form className="form-card access-gate__form" onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Nombre y apellidos"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            minLength={3}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className="access-gate__checkbox">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
            <span>
              He leído y acepto las condiciones de uso, protección de la obra y legado intelectual de Editorial ReproOrigen XXI.
            </span>
          </label>

          {status ? <p className="public-form__status">{status}</p> : null}
          <button type="submit" disabled={!accepted}>Entrar y continuar</button>
        </form>
      </div>
    </section>
  );
}

function PublicPage() {
  const { state, updateOS } = useOS();
  const [navOpen, setNavOpen] = useState(false);
  const [notFoundRequested, setNotFoundRequested] = useState(false);
  const [accessAccepted, setAccessAccepted] = useState(false);
  const [dawnChecklist, setDawnChecklist] = useState<Record<string, boolean>>(() => buildDawnChecklistSeed());
  const [dawnDecision, setDawnDecision] = useState('');
  const [dawnActionBeforeTen, setDawnActionBeforeTen] = useState('');
  const [dawnStatus, setDawnStatus] = useState('');
  const [dawnDateKey, setDawnDateKey] = useState('');
  const [dawnStartedAt, setDawnStartedAt] = useState('');
  const [dawnClosedAt, setDawnClosedAt] = useState('');
  const [dawnReflectionBuilt, setDawnReflectionBuilt] = useState('');
  const [dawnReflectionLearned, setDawnReflectionLearned] = useState('');
  const [dawnReflectionLegacy, setDawnReflectionLegacy] = useState('');
  const [weeklyActas, setWeeklyActas] = useState<WeeklyActa[]>([]);
  const [weeklyObjective, setWeeklyObjective] = useState('');
  const [weeklyStrategicDecision, setWeeklyStrategicDecision] = useState('');
  const [weeklyAction24h, setWeeklyAction24h] = useState('');
  const [weeklyResults, setWeeklyResults] = useState('');
  const [weeklyLearnings, setWeeklyLearnings] = useState('');
  const [weeklyArchitectsStatus, setWeeklyArchitectsStatus] = useState('');
  const [weeklyReflectionBuilt, setWeeklyReflectionBuilt] = useState('');
  const [weeklyReflectionLearned, setWeeklyReflectionLearned] = useState('');
  const [weeklyReflectionLegacy, setWeeklyReflectionLegacy] = useState('');
  const [weeklyStatusMessage, setWeeklyStatusMessage] = useState('');
  const [weeklyDateKey, setWeeklyDateKey] = useState('');
  const [weeklyCreatedAt, setWeeklyCreatedAt] = useState('');
  const [fiscalDashboardConfig, setFiscalDashboardConfig] = useState<FiscalDashboardConfig>(defaultFiscalDashboardConfig);
  const [fiscalStatusMessage, setFiscalStatusMessage] = useState('');

  const completedDawnTasks = dawnChecklistItems.filter((item) => dawnChecklist[item.id]).length;
  const dawnProgress = Math.round((completedDawnTasks / dawnChecklistItems.length) * 100);
  const dawnStateLabel = dawnProgress === 0 ? 'Sembrando' : dawnProgress < 100 ? 'Construyendo' : 'Consolidado';
  const dawnDurationMinutes = minutesBetween(dawnStartedAt, dawnClosedAt || new Date().toISOString());
  const dawnStartLabel = toClockTime(dawnStartedAt);
  const dawnCloseLabel = toClockTime(dawnClosedAt);
  const fiscalKpis = mision004Service.getErpKpis();
  const fiscalFacturas = mision004Service.listFacturas();
  const fiscalCobros = mision004Service.listCobros();

  const dayInMs = 1000 * 60 * 60 * 24;

  const daysSince = (isoDate?: string) => {
    if (!isoDate) return 0;
    return Math.floor((Date.now() - new Date(isoDate).getTime()) / dayInMs);
  };

  const isPendingInvoice = (invoice: Factura) => invoice.estado !== 'ANULADA' && invoice.estado !== 'PAGADA' && invoice.saldoPendiente > 0;

  const overdueInvoices = fiscalFacturas.filter(
    (invoice) => isPendingInvoice(invoice) && daysSince(invoice.fechaEmision) > fiscalDashboardConfig.overdueThresholdDays
  );

  const partialCollectionInvoices = fiscalFacturas.filter(
    (invoice) => invoice.estado === 'PENDIENTE' && invoice.saldoPendiente > 0 && invoice.saldoPendiente < invoice.importeTotal
  );

  const unpaidRiskInvoices = fiscalFacturas.filter(
    (invoice) => isPendingInvoice(invoice) && daysSince(invoice.fechaEmision) > fiscalDashboardConfig.overdueThresholdDays + 15
  );

  const estimatedCash = fiscalDashboardConfig.initialCash + fiscalCobros.reduce((sum, item) => sum + item.importe, 0);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: fiscalDashboardConfig.currency
    }).format(amount);

  useEffect(() => {
    const accepted = window.localStorage.getItem('reproorigen:editorial-access-accepted') === 'true';
    setAccessAccepted(accepted);
  }, []);

  useEffect(() => {
    const rawConfig = window.localStorage.getItem(fiscalDashboardConfigKey);
    if (!rawConfig) {
      setFiscalDashboardConfig(defaultFiscalDashboardConfig);
      return;
    }

    try {
      const parsed = JSON.parse(rawConfig) as Partial<FiscalDashboardConfig>;
      setFiscalDashboardConfig({
        currency: 'EUR',
        overdueThresholdDays: Math.max(1, Number(parsed.overdueThresholdDays ?? defaultFiscalDashboardConfig.overdueThresholdDays)),
        initialCash: Number(parsed.initialCash ?? defaultFiscalDashboardConfig.initialCash)
      });
    } catch {
      setFiscalDashboardConfig(defaultFiscalDashboardConfig);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(fiscalDashboardConfigKey, JSON.stringify(fiscalDashboardConfig));
  }, [fiscalDashboardConfig]);

  useEffect(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page');
    const initialRoute: PublicRoute = isPublicRoute(pageParam) ? pageParam : 'inicio';
    setNotFoundRequested(Boolean(pageParam) && !isPublicRoute(pageParam));
    updateOS({ publicRoute: initialRoute, activeModule: null, origin: 'web-publica' });

    const onPopState = () => {
      const nextRoute = new URLSearchParams(window.location.search).get('page');
      const parsedRoute: PublicRoute = isPublicRoute(nextRoute) ? nextRoute : 'inicio';
      setNotFoundRequested(Boolean(nextRoute) && !isPublicRoute(nextRoute));
      updateOS({ publicRoute: parsedRoute, activeModule: null, origin: 'web-publica' });
      setNavOpen(false);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [updateOS]);

  const currentRoute: PublicRoute = isPublicRoute(state.publicRoute) ? state.publicRoute : 'inicio';

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `reproorigen:ritual-0634:${today}`;
    const startIso = new Date().toISOString();
    const stored = window.localStorage.getItem(storageKey);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          checklist?: Record<string, boolean>;
          strategicDecision?: string;
          actionBeforeTen?: string;
          reflectionBuilt?: string;
          reflectionLearned?: string;
          reflectionLegacy?: string;
        };

        setDawnChecklist({ ...buildDawnChecklistSeed(), ...(parsed.checklist ?? {}) });
        setDawnDecision(parsed.strategicDecision ?? '');
        setDawnActionBeforeTen(parsed.actionBeforeTen ?? '');
        setDawnReflectionBuilt(parsed.reflectionBuilt ?? '');
        setDawnReflectionLearned(parsed.reflectionLearned ?? '');
        setDawnReflectionLegacy(parsed.reflectionLegacy ?? '');
        setDawnStatus('Registro 06:34 recuperado para hoy.');
      } catch {
        setDawnChecklist(buildDawnChecklistSeed());
      }
    }

    setDawnDateKey(today);
    setDawnStartedAt(startIso);

    const weeklyStored = window.localStorage.getItem(weeklyActaStorageKey);
    if (weeklyStored) {
      try {
        const parsed = JSON.parse(weeklyStored) as WeeklyActa[];
        setWeeklyActas(parsed);
      } catch {
        setWeeklyActas([]);
      }
    }

    const weeklyKey = `${new Date().getFullYear()}-${weekLabelFromDate(new Date())}`;
    const weeklyKeyStorage = `reproorigen:acta-semanal:${weeklyKey}`;
    const actaStored = window.localStorage.getItem(weeklyKeyStorage);
    if (actaStored) {
      try {
        const parsed = JSON.parse(actaStored) as WeeklyActa;
        setWeeklyObjective(parsed.objective ?? '');
        setWeeklyStrategicDecision(parsed.strategicDecision ?? '');
        setWeeklyAction24h(parsed.action24h ?? '');
        setWeeklyResults(parsed.results ?? '');
        setWeeklyLearnings(parsed.learnings ?? '');
        setWeeklyArchitectsStatus(parsed.architectsStatus ?? '');
        setWeeklyReflectionBuilt(parsed.reflectionBuilt ?? '');
        setWeeklyReflectionLearned(parsed.reflectionLearned ?? '');
        setWeeklyReflectionLegacy(parsed.reflectionLegacy ?? '');
        setWeeklyCreatedAt(parsed.createdAt ?? new Date().toISOString());
        setWeeklyStatusMessage('Acta semanal actual recuperada.');
      } catch {
        setWeeklyCreatedAt(new Date().toISOString());
        setWeeklyStatusMessage('Acta semanal preparada para esta semana.');
      }
    } else {
      setWeeklyCreatedAt(new Date().toISOString());
      setWeeklyStatusMessage('Acta semanal preparada para esta semana.');
    }

    setWeeklyDateKey(weeklyKey);
  }, []);

  useEffect(() => {
    if (!dawnDateKey) {
      return;
    }

    const payload = {
      checklist: dawnChecklist,
      strategicDecision: dawnDecision,
      actionBeforeTen: dawnActionBeforeTen,
      reflectionBuilt: dawnReflectionBuilt,
      reflectionLearned: dawnReflectionLearned,
      reflectionLegacy: dawnReflectionLegacy,
      updatedAt: new Date().toISOString()
    };

    window.localStorage.setItem(`reproorigen:ritual-0634:${dawnDateKey}`, JSON.stringify(payload));
  }, [
    dawnChecklist,
    dawnDecision,
    dawnActionBeforeTen,
    dawnReflectionBuilt,
    dawnReflectionLearned,
    dawnReflectionLegacy,
    dawnDateKey
  ]);

  useEffect(() => {
    if (!weeklyDateKey || !weeklyCreatedAt) {
      return;
    }

    const acta: WeeklyActa = {
      weekKey: weeklyDateKey,
      label: weekLabelFromDate(new Date()),
      objective: weeklyObjective,
      strategicDecision: weeklyStrategicDecision,
      action24h: weeklyAction24h,
      results: weeklyResults,
      learnings: weeklyLearnings,
      architectsStatus: weeklyArchitectsStatus,
      reflectionBuilt: weeklyReflectionBuilt,
      reflectionLearned: weeklyReflectionLearned,
      reflectionLegacy: weeklyReflectionLegacy,
      createdAt: weeklyCreatedAt,
      closedAt: dawnClosedAt || '',
      durationMinutes: minutesBetween(dawnStartedAt, dawnClosedAt),
      ritualState: dawnChecklistItems.every((item) => dawnChecklist[item.id])
        ? 'Consolidado'
        : completedDawnTasks > 0
          ? 'Construyendo'
          : 'Sembrando'
    };

    const key = `reproorigen:acta-semanal:${weeklyDateKey}`;
    const serialized = JSON.stringify(acta);
    if (window.localStorage.getItem(key) !== serialized) {
      window.localStorage.setItem(key, serialized);
    }
  }, [
    weeklyDateKey,
    weeklyCreatedAt,
    weeklyObjective,
    weeklyStrategicDecision,
    weeklyAction24h,
    weeklyResults,
    weeklyLearnings,
    weeklyArchitectsStatus,
    weeklyReflectionBuilt,
    weeklyReflectionLearned,
    weeklyReflectionLegacy,
    dawnStartedAt,
    dawnClosedAt,
    dawnChecklist
  ]);

  useEffect(() => {
    if (!weeklyDateKey || !weeklyCreatedAt) {
      return;
    }

    const currentActa: WeeklyActa = {
      weekKey: weeklyDateKey,
      label: weekLabelFromDate(new Date()),
      objective: weeklyObjective,
      strategicDecision: weeklyStrategicDecision,
      action24h: weeklyAction24h,
      results: weeklyResults,
      learnings: weeklyLearnings,
      architectsStatus: weeklyArchitectsStatus,
      reflectionBuilt: weeklyReflectionBuilt,
      reflectionLearned: weeklyReflectionLearned,
      reflectionLegacy: weeklyReflectionLegacy,
      createdAt: weeklyCreatedAt,
      closedAt: dawnClosedAt || '',
      durationMinutes: minutesBetween(dawnStartedAt, dawnClosedAt),
      ritualState: dawnChecklistItems.every((item) => dawnChecklist[item.id])
        ? 'Consolidado'
        : completedDawnTasks > 0
          ? 'Construyendo'
          : 'Sembrando'
    };

    setWeeklyActas((prev) => {
      const next = prev.filter((entry) => entry.weekKey !== weeklyDateKey);
      return [currentActa, ...next].slice(0, 12);
    });
  }, [
    weeklyDateKey,
    weeklyCreatedAt,
    weeklyObjective,
    weeklyStrategicDecision,
    weeklyAction24h,
    weeklyResults,
    weeklyLearnings,
    weeklyArchitectsStatus,
    weeklyReflectionBuilt,
    weeklyReflectionLearned,
    weeklyReflectionLegacy,
    dawnStartedAt,
    dawnClosedAt,
    dawnChecklist,
    completedDawnTasks
  ]);

  useEffect(() => {
    const meta = pageMeta[currentRoute];
    const baseUrl = new URL(publicConfig.domain);
    const canonicalUrl = new URL(baseUrl.toString());
    canonicalUrl.pathname = '/';
    canonicalUrl.search = currentRoute === 'inicio' ? '' : `?page=${currentRoute}`;
    document.title = meta.title;

    const setMeta = (selector: string, content: string) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      }
    };

    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', canonicalUrl.toString());

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl.toString());
  }, [currentRoute]);

  const navigate = (route: PublicRoute) => {
    updateOS({ publicRoute: route, activeModule: null, origin: 'web-publica' });
    const url = new URL(window.location.href);
    if (route === 'inicio') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', route);
    }
    window.history.pushState({}, '', url.toString());
    setNavOpen(false);
  };

  const toggleDawnTask = (taskId: string) => {
    setDawnChecklist((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const startDawnRitual = () => {
    setDawnChecklist(buildDawnChecklistSeed());
    setDawnDecision('');
    setDawnActionBeforeTen('');
    setDawnStatus('Ritual 06:34 iniciado. La direccion del dia ya esta en marcha.');
    setDawnStartedAt(new Date().toISOString());
    setDawnClosedAt('');
  };

  const saveDawnSummary = () => {
    const closedAt = new Date().toISOString();
    setDawnClosedAt(closedAt);
    setDawnStatus('Registro diario guardado. El Origen Despierta queda documentado en la jornada de hoy.');
  };

  const saveWeeklyActa = () => {
    const weekState = dawnChecklistItems.every((item) => dawnChecklist[item.id])
      ? 'Consolidado'
      : completedDawnTasks > 0
        ? 'Construyendo'
        : 'Sembrando';

    const nowIso = new Date().toISOString();
    const createdAt = weeklyCreatedAt || nowIso;
    if (!weeklyCreatedAt) {
      setWeeklyCreatedAt(createdAt);
    }

    const acta: WeeklyActa = {
      weekKey: weeklyDateKey,
      label: weekLabelFromDate(new Date()),
      objective: weeklyObjective,
      strategicDecision: weeklyStrategicDecision,
      action24h: weeklyAction24h,
      results: weeklyResults,
      learnings: weeklyLearnings,
      architectsStatus: weeklyArchitectsStatus,
      reflectionBuilt: weeklyReflectionBuilt,
      reflectionLearned: weeklyReflectionLearned,
      reflectionLegacy: weeklyReflectionLegacy,
      createdAt,
      closedAt: dawnClosedAt || nowIso,
      durationMinutes: minutesBetween(dawnStartedAt, dawnClosedAt || nowIso),
      ritualState: weekState
    };

    const next = [acta, ...weeklyActas.filter((entry) => entry.weekKey !== weeklyDateKey)].slice(0, 12);
    setWeeklyActas(next);
    window.localStorage.setItem(weeklyActaStorageKey, JSON.stringify(next));
    window.localStorage.setItem(`reproorigen:acta-semanal:${weeklyDateKey}`, JSON.stringify(acta));
    setWeeklyStatusMessage(`Acta semanal sellada como ${acta.label}. Lista para futura Cronica ReproOrigen XXI.`);
  };

  const saveFiscalConfig = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFiscalStatusMessage('Configuracion fiscal guardada en Sala de Direccion.');
  };

  const renderPage = () => {
    if (notFoundRequested) {
      return (
        <section className="public-panel public-panel--stack" role="status" aria-live="polite">
          <h1>Error 404</h1>
          <p>La ruta solicitada no existe o ya no está disponible.</p>
          <div className="public-hero__actions">
            <button type="button" className="public-button public-button--primary" onClick={() => navigate('inicio')}>
              Volver al inicio
            </button>
            <button type="button" className="public-button public-button--secondary" onClick={() => navigate('contacto')}>
              Ir a contacto
            </button>
          </div>
        </section>
      );
    }

    if (currentRoute === 'inicio') {
      const arcaTerritorios: Array<{ emoji: string; nombre: string; subtitulo: string; descripcion: string; route: PublicRoute; className: string }> = [
        {
          emoji: '🌲',
          nombre: 'Bosque del Territorio',
          subtitulo: 'Naturaleza · Revitalización',
          descripcion: 'Ayuntamientos, naturaleza y proyectos de revitalización territorial.',
          route: 'sectores',
          className: 'home-map__node--territorio'
        },
        {
          emoji: '🏛️',
          nombre: 'Ciudad de las Empresas',
          subtitulo: 'IA · Estrategia · Automatización',
          descripcion: 'Inteligencia artificial, estrategia empresarial y automatización aplicada.',
          route: 'soluciones',
          className: 'home-map__node--empresas'
        },
        {
          emoji: '⚒️',
          nombre: 'Forja del Hogar',
          subtitulo: 'Energía · Ventanas · Rehabilitación',
          descripcion: 'Rehabilitación energética, ventanas y eficiencia para el hogar y la comunidad.',
          route: 'automatizacion-inteligente',
          className: 'home-map__node--ia'
        },
        {
          emoji: '📚',
          nombre: 'Biblioteca Viva',
          subtitulo: 'Campus · Conocimiento · Metodología',
          descripcion: 'Campus, obras vivas y metodología para construir conocimiento con legado.',
          route: 'biblioteca-viva',
          className: 'home-map__node--campus'
        },
        {
          emoji: '🌍',
          nombre: 'Rutas del Origen',
          subtitulo: 'Experiencias · Viajes',
          descripcion: 'Experiencias con propósito, viajes educativos y rutas del territorio.',
          route: 'albatour',
          className: 'home-map__node--experiencias'
        }
      ];

      const arcaContents = [
        { icon: '🤖', label: 'Agentes IA', description: 'Arquitectos especializados por dominio.' },
        { icon: '📐', label: 'Métodos', description: 'Procesos replicables y conocimiento vivo.' },
        { icon: '🗺️', label: 'Proyectos', description: 'Ejecución con hitos y trazabilidad.' },
        { icon: '🤝', label: 'Personas', description: 'Comunidad de guardianes y colaboradores.' },
        { icon: '🌿', label: 'Territorios', description: 'Municipios, empresas y ecosistemas.' }
      ];

      const chapters = [
        {
          number: 'CAPÍTULO I',
          title: 'El origen',
          description: 'Conocimiento aplicado, método replicable y acompañamiento real. El origen de un ecosistema vivo que mejora con cada proyecto.',
          action: null
        },
        {
          number: 'CAPÍTULO II',
          title: 'La transformación',
          description: 'Empresas, territorios y personas que evolucionan. Estrategia, automatización e impacto medible en cada ruta de cambio.',
          action: { label: 'Ver ecosistema', route: 'soluciones' as PublicRoute }
        },
        {
          number: 'CAPÍTULO III',
          title: 'Los guardianes del conocimiento',
          description: 'Director, Consejo de Guardianes y Arquitectos IA. Una jerarquía viva que custodia el rumbo, la memoria y la ejecución del sistema.',
          action: { label: 'Conocer la jerarquía', route: 'jerarquia-reproorigen' as PublicRoute }
        },
        {
          number: 'CAPÍTULO IV',
          title: 'Los territorios del futuro',
          description: 'Bosques, ciudades, forjas, bibliotecas y rutas. Cinco puertas abiertas hacia un universo de legado, aventura y descubrimiento.',
          action: { label: 'Explorar territorios', route: 'mapa-conocimiento' as PublicRoute }
        }
      ];

      return (
        <div className="public-home public-home--editorial">

          {/* ESCENA 1 — El Despertar del Sello */}
          <motion.section
            className="home-hero home-hero--cinematic home-hero--despertar"
            aria-label="El Despertar del Sello — ReproOrigen XXI"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="home-seal"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <img src="/sello-reproorigen-oficial.png" alt="Sello oficial de ReproOrigen XXI — emblema del viaje" loading="eager" decoding="async" />
            </motion.div>
            <motion.p
              className="home-hero__eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
            >
              El Arca del Origen · Una navegación hacia un nuevo siglo
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
            >
              El origen de una nueva era.
            </motion.h1>
            <motion.p
              className="home-hero__lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.05 }}
            >
              El visitante no entra en una página. Entra en una historia.
            </motion.p>
            <motion.div
              className="home-hero__actions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
            >
              <button type="button" className="public-button public-button--primary" onClick={() => navigate('soluciones')}>
                Iniciar el viaje
              </button>
              <button type="button" className="public-button public-button--secondary" onClick={() => navigate('mapa-conocimiento')}>
                Ver el mapa
              </button>
            </motion.div>
          </motion.section>

          {/* ESCENA 2 — El Mapa del Viaje */}
          <motion.section
            className="home-map home-map--cinematic home-map--territories"
            aria-label="Mapa del Viaje — cinco territorios"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
          >
            <p className="home-hero__eyebrow">ESCENA II · EL MAPA DEL VIAJE</p>
            <h2>Los territorios del ecosistema</h2>
            <p>Como un mapa de navegación antiguo: costas, bosques, montañas y rutas hacia cada puerta del universo ReproOrigen XXI.</p>
            <div className="home-territories__grid">
              {arcaTerritorios.map((territorio, index) => (
                <motion.button
                  key={territorio.nombre}
                  type="button"
                  className={`home-territory__card ${territorio.className}`}
                  onClick={() => navigate(territorio.route)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="home-territory__emoji" aria-hidden="true">{territorio.emoji}</span>
                  <span className="home-territory__name">{territorio.nombre}</span>
                  <span className="home-territory__subtitle">{territorio.subtitulo}</span>
                  <span className="home-territory__desc">{territorio.descripcion}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* ESCENA 3 — El Arca */}
          <PhotoBanner
            imageUrl="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80"
            title="El Arca ReproOrigen XXI"
            caption="Una biblioteca antigua que ha evolucionado al siglo XXI. Madera, tecnología, mapas, cristal y luz."
          />

          <motion.section
            className="public-panel public-panel--stack home-chapter home-arca"
            aria-label="El Arca — interior del ecosistema"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="public-kicker">ESCENA III · EL ARCA</p>
            <h2>Dentro del Arca</h2>
            <p className="home-arca__intro">No es una nave futurista fría. Es una mezcla de madera, tecnología, mapas, cristal y luz. Como si una biblioteca antigua hubiera evolucionado al siglo XXI.</p>
            <div className="home-arca__contents">
              {arcaContents.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="home-arca__item"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: index * 0.09 }}
                >
                  <span className="home-arca__icon" aria-hidden="true">{item.icon}</span>
                  <strong className="home-arca__label">{item.label}</strong>
                  <span className="home-arca__desc">{item.description}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ESCENA 4 — Los Capítulos */}
          <PhotoBanner
            imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80"
            title="Una saga de descubrimiento, exploración y legado"
            caption="ReproOrigen XXI no es una web que explica servicios. Es un universo que invita a ser explorado."
          />

          <motion.section
            className="public-panel public-panel--stack home-chapter"
            aria-label="Los Capítulos"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="public-kicker">ESCENA IV · LOS CAPÍTULOS</p>
            <h2>La historia en cuatro capítulos</h2>
            <div className="public-grid public-grid--cases home-grid-reduced home-chapters__grid">
              {chapters.map((chapter, index) => (
                <motion.article
                  key={chapter.number}
                  className="public-card home-chapter__card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.09 }}
                >
                  <p className="home-chapter__number">{chapter.number}</p>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.description}</p>
                  {chapter.action && (
                    <button type="button" className="public-button" onClick={() => navigate(chapter.action!.route)}>
                      {chapter.action.label}
                    </button>
                  )}
                </motion.article>
              ))}
            </div>
          </motion.section>

          <FinalCta onNavigate={navigate} />
        </div>
      );
    }

    if (currentRoute === 'quienes-somos') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Quiénes Somos</h1>
          <div className="public-grid public-grid--cases">
            <article className="public-card">
              <h2>Nuestra historia</h2>
              <p>ReproOrigen XXI nace para unir capacidades técnicas, estratégicas y humanas en una propuesta de transformación real.</p>
            </article>
            <article className="public-card">
              <h2>Nuestra misión</h2>
              <p>Acompañar a empresas, instituciones y personas para convertir retos en oportunidades sostenibles.</p>
            </article>
            <article className="public-card">
              <h2>Nuestra visión</h2>
              <p>Construir un ecosistema donde tecnología, territorio y comunidad avanzan en la misma dirección.</p>
            </article>
            <article className="public-card">
              <h2>Nuestros valores</h2>
              <p>Confianza, colaboración, excelencia operativa y compromiso con el impacto social y ambiental.</p>
            </article>
            <article className="public-card">
              <h2>Tecnología con propósito</h2>
              <p>La tecnología organiza el trabajo; las personas dan sentido al futuro.</p>
            </article>
            <article className="public-card">
              <h2>Desarrollo territorial</h2>
              <p>Activamos proyectos que fortalecen tejido local, empleo y cooperación entre agentes del territorio.</p>
            </article>
            <article className="public-card">
              <h2>Comunidad</h2>
              <p>Cada relación con clientes y colaboradores forma parte de una comunidad de valor a largo plazo.</p>
            </article>
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'nuestro-metodo') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Nuestro Método</h1>
          <p>Un proceso visual, claro y continuo para transformar confianza en resultados.</p>
          <div className="public-grid public-grid--workflow">
            {methodFlow.map((step, index) => (
              <article key={step} className="public-card">
                <h2>{step}</h2>
                {index < methodFlow.length - 1 ? <p>↓</p> : null}
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'colabora-con-nosotros') {
      return (
        <section className="public-contact">
          <div className="public-contact__copy">
            <h1>Colabora con Nosotros</h1>
            <p>Buscamos colaboradores para ampliar el ecosistema ReproOrigen XXI en ámbitos técnicos, educativos, institucionales y territoriales.</p>
            <div className="public-grid">
              {collaborationProfiles.map((item) => (
                <article key={item} className="public-card">
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
          <div className="public-contact__forms">
            <CollaborateForm />
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'soluciones') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Soluciones</h1>
          <p>Trabajamos por ecosistemas para activar soluciones conectadas y escalables, con conocimiento práctico y ejecución coordinada.</p>
          <div className="public-grid">
            {ecosystems.map((item) => (
              <article key={item} className="public-card">
                <h2>{item}</h2>
                <p>{ecosystemNarratives[item]}</p>
              </article>
            ))}
          </div>

          <h2>Nichos Prioritarios en Ejecución</h2>
          <p>Empezamos por nichos donde ya tenemos método, lenguaje comercial y capacidad de entrega en ciclos cortos.</p>
          <div className="public-grid public-grid--cases">
            {priorityNicheSprints.map((item) => (
              <article key={item.niche} className="public-card public-card--highlight">
                <p className="public-card__badge">Sprint de nicho</p>
                <h3>{item.niche}</h3>
                <p><strong>Promesa:</strong> {item.promise}</p>
                <p><strong>Primera entrega:</strong> {item.firstDeliverable}</p>
                <p><strong>KPI:</strong> {item.kpi}</p>
                <p><strong>Arquitecto recomendado:</strong> {item.recommendedAgent}</p>
                <p><strong>Siguiente paso:</strong> {item.nextStep}</p>
              </article>
            ))}
          </div>

          <h2>Mensajes de campaña listos para publicar</h2>
          <div className="public-grid public-grid--cases">
            {priorityNicheSprints.map((item) => (
              <article key={`campaign-${item.niche}`} className="public-card">
                <h3>{item.niche}</h3>
                <p><strong>Anuncio:</strong> {item.campaignAd}</p>
                <p><strong>Mensaje landing:</strong> {item.landingMessage}</p>
                <p><strong>Apertura de llamada:</strong> {item.callOpening}</p>
              </article>
            ))}
          </div>

          <article className="public-card">
            <h3>Reglas de ejecución por nicho</h3>
            <ul className="public-tree-list">
              {nicheExecutionPrinciples.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </article>

          <NicheActivationForm />
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'sectores') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Sectores</h1>
          <p>Fichas sectoriales con enfoque operativo: narrativa comercial, primera entrega y siguiente paso de activación.</p>
          <div className="public-grid public-grid--sectors">
            {sectors.map((item) => (
              <article key={item} className="public-card">
                <h2>{item}</h2>
                <p>{sectorNarratives[item]}</p>
              </article>
            ))}
          </div>

          <h2>Maestría en marcha por nichos</h2>
          <div className="public-grid public-grid--cases">
            {priorityNicheSprints.map((item) => (
              <article key={`sector-${item.niche}`} className="public-card">
                <h3>{item.niche}</h3>
                <p><strong>Propuesta de valor:</strong> {item.promise}</p>
                <p><strong>Oferta de entrada:</strong> {item.firstDeliverable}</p>
                <p><strong>Resultado que medimos:</strong> {item.kpi}</p>
                <p><strong>Arquitecto recomendado:</strong> {item.recommendedAgent}</p>
              </article>
            ))}
          </div>

          <NicheActivationForm />
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'automatizacion-inteligente') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Arquitectos IA</h1>
          <p>Vista general del ecosistema IA. Para la arquitectura completa por áreas, consulta el catálogo estructural.</p>
          <div className="public-grid">
            {aiAgents.map((item) => (
              <article key={item} className="public-card">
                <h2>{item}</h2>
                <p>Arquitecto IA especializado para soporte operativo y estratégico.</p>
              </article>
            ))}
          </div>
          <button type="button" className="public-button public-button--primary" onClick={() => navigate('catalogo-agentes-ia')}>
            Ir al catálogo de arquitectura
          </button>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'editorial-reproorigen') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <section className="public-hero editorial-hero">
            <p className="public-kicker">Misión 005</p>
            <h1>Editorial ReproOrigen XXI</h1>
            <p>Sistema editorial vivo para convertir cada documento en conocimiento estructurado y trazable.</p>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Arquitectura Visual del Repositorio Editorial</h2>
            <div className="public-grid public-grid--cases">
              {editorialRepositoryArchitecture.map((item) => (
                <article key={item.name} className="public-card editorial-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Nueva Categoría: OBRAS VIVAS</h2>
            <article className="public-card public-card--highlight editorial-note">
              <h3>Definición</h3>
              <p>{obrasVivasManifest}</p>
            </article>
            <div className="public-grid public-grid--cases">
              {editorialPhilosophyPrinciples.map((item) => (
                <article key={item} className="public-card editorial-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>{firstLivingWork.title}</h2>
            <div className="public-grid">
              <article className="public-card editorial-card">
                <h3>Autora</h3>
                <p>{firstLivingWork.author}</p>
              </article>
              <article className="public-card editorial-card">
                <h3>Estado</h3>
                <p>{firstLivingWork.status}</p>
              </article>
              <article className="public-card editorial-card">
                <h3>Colección</h3>
                <p>{firstLivingWork.collection}</p>
              </article>
              <article className="public-card editorial-card">
                <h3>Territorio narrativo</h3>
                <p>{firstLivingWork.territory}</p>
              </article>
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Secciones del Proyecto Editorial</h2>
            <p>Cada libro mantiene su propia carpeta y estas secciones obligatorias para no perder información.</p>
            <div className="public-grid public-grid--workflow">
              {editorialProjectSections.map((item, index) => (
                <article key={item} className="public-card editorial-card">
                  <p className="public-kicker">Sección {index + 1}</p>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Formato de Entrada Editorial</h2>
            <p>La plataforma clasifica contenidos por etiquetas de trabajo para ubicar cada pieza en su proyecto correspondiente.</p>
            <div className="public-grid public-grid--cases">
              {editorialSubmissionFormat.map((item) => (
                <article key={item} className="public-card editorial-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Estrategia de Formatos Vivos</h2>
            <p>Cada obra nace con estructura narrativa sólida para poder vivir en varios formatos sin perder identidad editorial.</p>
            <div className="public-grid public-grid--cases">
              {editorialFormats.map((item) => (
                <article key={item} className="public-card editorial-card">
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </section>

          <div className="public-grid public-grid--cases">
            {[
              { title: 'Biblioteca Viva', route: 'biblioteca-viva' as PublicRoute },
              { title: 'Escuela Editorial', route: 'escuela-editorial' as PublicRoute },
              { title: 'Obra Fundacional', route: 'la-llegada-de-la-promesa' as PublicRoute },
              { title: 'Comunidad de Autores', route: 'comunidad-reproorigen' as PublicRoute }
            ].map((item) => (
              <article key={item.title} className="public-card editorial-card">
                <h3>{item.title}</h3>
                <button type="button" className="public-button" onClick={() => navigate(item.route)}>
                  Ir a {routeLabels[item.route]}
                </button>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'la-llegada-de-la-promesa') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />

          <section className="public-hero editorial-hero editorial-hero--fundational">
            <p className="public-kicker">Proyecto Editorial Nº001</p>
            <h1>{fundationalBook.title}</h1>
            <p>{fundationalBook.subtitle}</p>
            <div className="public-hero__meta">
              <span>Autora: {fundationalBook.author}</span>
              <span>Estado: {fundationalBook.status}</span>
              <span>Colección: {fundationalBook.collection}</span>
              <span>Sello: {fundationalBook.imprint}</span>
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Ficha pública del libro</h2>
            <div className="fundational-book-layout">
              <article className="public-book-cover public-book-cover--parchment" aria-label="Portada editorial de La Llegada de la Promesa">
                <p className="public-book-cover__label">Portada</p>
                <h3 className="public-book-cover__title">{fundationalBook.title}</h3>
                <p className="public-book-cover__author">{fundationalBook.subtitle}</p>
                <p className="public-book-signature">{fundationalBook.author}</p>
                <p className="public-book-cover__seal">Sello de cera editorial</p>
              </article>

              <div className="public-grid public-grid--cases">
                <article className="public-card editorial-card">
                  <h3>Autora</h3>
                  <p>{fundationalBook.author}</p>
                </article>
                <article className="public-card editorial-card">
                  <h3>Sinopsis</h3>
                  <p>{fundationalBook.synopsis}</p>
                </article>
                <article className="public-card editorial-card">
                  <h3>Estado</h3>
                  <p>{fundationalBook.status}</p>
                </article>
                <article className="public-card editorial-card">
                  <h3>Fecha de Primera Edición</h3>
                  <p>{fundationalBook.firstEdition}</p>
                </article>
                <article className="public-card editorial-card">
                  <h3>Colección</h3>
                  <p>{fundationalBook.collection}</p>
                </article>
                <article className="public-card editorial-card">
                  <h3>Sello Editorial</h3>
                  <p>{fundationalBook.imprint}</p>
                </article>
              </div>
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Presentación</h2>
            <article className="public-card editorial-card">
              <p>{fundationalBookSections.presentation}</p>
            </article>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>La Historia</h2>
            <article className="public-card editorial-card">
              <p>{fundationalBookSections.story}</p>
            </article>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Sobre La Autora</h2>
            <article className="public-card editorial-card">
              <p>{fundationalBookSections.author}</p>
            </article>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Colección</h2>
            <article className="public-card public-card--highlight editorial-note">
              <h3>Obras Vivas</h3>
              <p>
                Las Obras Vivas son publicaciones que evolucionan con el tiempo, incorporando nuevas ediciones y capítulos sin perder la
                identidad de la obra original.
              </p>
            </article>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Biblioteca Viva</h2>
            <article className="public-card editorial-card">
              <p>{fundationalBookSections.bibliotecaViva}</p>
            </article>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Editorial ReproOrigen XXI</h2>
            <article className="public-card editorial-card">
              <p>{fundationalBookSections.editorial}</p>
            </article>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Página Legal</h2>
            <article className="public-card editorial-card editorial-legal">
              <p>© Rebeca Pitarch</p>
              <p>Primera Edición</p>
              <p>Publicado Bajo El Sello Editorial ReproOrigen XXI</p>
              <p>
                Esta obra está protegida por la legislación nacional e internacional sobre propiedad intelectual y derechos de autor. Queda
                prohibida su reproducción total o parcial sin autorización previa y por escrito de la autora, salvo los casos expresamente
                previstos por la legislación vigente.
              </p>
            </article>
          </section>

          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'escuela-editorial') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <section className="public-hero editorial-hero">
            <p className="public-kicker">Escuela Editorial ReproOrigen XXI</p>
            <h1>Escuela Editorial</h1>
            <p>Recorrido público para acompañar la creación de una obra con método, claridad y legado.</p>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Recorrido de Escuela Editorial</h2>
            <div className="public-grid public-grid--workflow">
              {editorialMethodStages.map((stage, index) => (
                <article key={stage} className="public-card editorial-card">
                  <p className="public-kicker">Paso {index + 1}</p>
                  <h3>{stage}.</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Arquitecto Editorial IA</h2>
            <p>Se presenta como mentor editorial para acompañar cada obra de principio a fin. Esta sección es pública y no implementa IA real.</p>
            <div className="public-grid">
              {editorialAgentSpecialties.map((specialty) => (
                <article key={specialty} className="public-card editorial-card">
                  <h3>{specialty}</h3>
                </article>
              ))}
            </div>
          </section>

          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'campus-reproorigen') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <h1>Campus ReproOrigen XXI</h1>
          <p>Arquitectura de escuelas y rutas formativas del Campus, orientada a conocimiento aplicable, transferible y medible.</p>
          <div className="public-grid public-grid--cases">
            {campusSchools.map((item) => (
              <article key={item.name} className="public-card">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {item.relation ? (
                  <button type="button" className="public-button" onClick={() => navigate(item.relation!)}>
                    Ir a {routeLabels[item.relation]}
                  </button>
                ) : null}
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'catalogo-agentes-ia') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <h1>Catalogo de Arquitectos IA</h1>
          <p>Mapa estructural de arquitectos por dominio operativo y estrategico. Cada arquitecto existe para resolver una tarea concreta dentro de un metodo verificable.</p>
          <div className="public-grid public-grid--cases">
            {agentCatalog.map((item) => (
              <article key={item.name} className={`public-card ${item.name === 'Arquitecto Editorial' ? 'public-card--highlight' : ''}`}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {item.name === 'Arquitecto Editorial' ? <p className="public-card__badge">Nuevo en catalogo publico</p> : null}
                {item.relation ? (
                  <button type="button" className="public-button" onClick={() => navigate(item.relation!)}>
                    Ir a {routeLabels[item.relation]}
                  </button>
                ) : null}
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'jerarquia-reproorigen') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <h1>Jerarquia ReproOrigen XXI</h1>
          <p>Arquitectura institucional para coordinar direccion, modulos y Arquitectos IA bajo una misma identidad de marca.</p>

          <section className="public-panel public-panel--stack">
            <h2>Niveles de mando</h2>
            <div className="public-grid public-grid--cases">
              {hierarchyLevels.map((level) => (
                <article key={level.name} className="public-card public-card--highlight">
                  <p className="public-kicker">{level.role}</p>
                  <h3>{level.name}</h3>
                  <p>{level.mission}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Familias operativas</h2>
            <div className="public-grid public-grid--cases">
              {architectFamilies.map((family) => (
                <article key={family.title} className="public-card">
                  <h3>{family.title}</h3>
                  <p>{family.focus}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Universo de identidad</h2>
            <p>Nomenclatura oficial para que cada Arquitecto IA se reconozca como parte del ecosistema ReproOrigen XXI.</p>
            <div className="public-grid public-grid--sectors">
              {ecosystemIdentityMap.map((item) => (
                <article key={item.code} className="public-card">
                  <h3>{item.code}</h3>
                  <p>{item.meaning}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel">
            <h2>Regla de marca</h2>
            <p>En toda comunicacion visible usamos Arquitecto IA en lugar de Agente IA. ReproOrigen XXI construye obras, no bots.</p>
          </section>

          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'comunidad-reproorigen') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <section className="public-hero editorial-hero">
            <p className="public-kicker">Comunidad de Autores</p>
            <h1>Comunidad de Autores ReproOrigen XXI</h1>
            <p>Sección pública preparada para que, en el futuro, autoras y autores formen parte activa del ecosistema.</p>
          </section>
          <section className="public-panel public-panel--stack editorial-panel">
            <h2>Espacio en construcción editorial</h2>
            <div className="public-grid public-grid--cases">
              {communityCommitments.map((item) => (
                <article key={item} className="public-card editorial-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'como-trabajamos') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>¿Cómo Trabajamos?</h1>
          <p>Recorrido claro y estructurado para que cada cliente avance con seguridad desde el primer contacto hasta el impacto.</p>
          <div className="public-grid public-grid--workflow">
            {trustJourney.map((step) => (
              <article key={step} className="public-card">
                <h2>{step}</h2>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'nuestra-comunidad') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Nuestra Comunidad</h1>
          <p>Todos los clientes y colaboradores forman parte de la Comunidad ReproOrigen XXI y comparten una visión de progreso con impacto positivo.</p>
          <div className="public-grid">
            {communityPillars.map((value) => (
              <article key={value} className="public-card">
                <h2>{value}</h2>
              </article>
            ))}
          </div>
          <button type="button" className="public-button public-button--primary" onClick={() => navigate('comunidad-reproorigen')}>
            Ver mapa de colaboradores
          </button>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'casos-transformacion') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Casos de Transformación</h1>
          <p>Ejemplos descriptivos de cómo convertimos retos complejos en soluciones con beneficios esperados.</p>
          <div className="public-grid public-grid--cases">
            {transformationCases.map((item) => (
              <article key={item.title} className="public-card">
                <h2>{item.title}</h2>
                <p><strong>Problema:</strong> {item.problem}</p>
                <p><strong>Solución:</strong> {item.solution}</p>
                <p><strong>Beneficios esperados:</strong> {item.benefits}</p>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'preguntas-frecuentes') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Preguntas Frecuentes</h1>
          <div className="public-grid public-grid--cases">
            {faqItems.map((item) => (
              <article key={item.question} className="public-card">
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'alianzas') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Alianzas</h1>
          <p>Perfiles profesionales y organizaciones que pueden integrarse como colaboradores del ecosistema ReproOrigen XXI.</p>
          <div className="public-grid">
            {allianceProfiles.map((item) => (
              <article key={item} className="public-card">
                <h2>{item}</h2>
                <p>Integración como colaborador para crear soluciones coordinadas y de impacto.</p>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'mapa-conocimiento') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />

          <section className="public-hero editorial-hero knowledge-hero">
            <p className="public-kicker">Mision 009</p>
            <h1>Mapa Del Conocimiento ReproOrigen XXI</h1>
            <p>
              ReproOrigen XXI se construye con conocimiento, experiencia, metodologia y aprendizaje continuo. Cada area evoluciona con
              proposito hacia formacion, consultoria, arquitectos IA, publicaciones, experiencias o proyectos.
            </p>
          </section>

          <section className="public-panel public-panel--stack editorial-panel knowledge-panel">
            <h2>Áreas de Conocimiento</h2>
            <div className="public-grid public-grid--cases">
              {knowledgeAreas.map((group) => (
                <article key={group.title} className="public-card editorial-card knowledge-card">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>

                  <p className="public-kicker">Especialidades</p>
                  <div className="knowledge-badges">
                    {group.areas.map((area) => (
                      <span key={area}>{area}</span>
                    ))}
                  </div>

                  <p className="public-kicker">Conexiones futuras</p>
                  <div className="knowledge-connections">
                    {group.connections.map((connection) => (
                      <span key={connection}>{connection}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel knowledge-panel">
            <h2>Transformación del conocimiento</h2>
            <p>Las áreas no se muestran por tendencia, sino por competencia demostrable y evolución coherente dentro del ecosistema.</p>
            <div className="knowledge-transform-grid" role="list" aria-label="Destino del conocimiento">
              {knowledgeOutputs.map((output, index) => (
                <article key={output} className="public-card knowledge-transform-card" role="listitem">
                  <p className="public-kicker">Destino {index + 1}</p>
                  <h3>{output}</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack editorial-panel knowledge-panel">
            <h2>Dirección Estratégica</h2>
            <article className="public-card editorial-note">
              <p>
                Todo conocimiento incorporado al ecosistema debe provenir de experiencia real, formacion acreditada, investigacion o
                metodologia propia. El crecimiento sera organico, coherente y basado en excelencia.
              </p>
            </article>
          </section>

          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'fundacion') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <h1>Fundación ReproOrigen XXI</h1>
          <p>Estructura fundacional para impacto social y ambiental, conectada con educación, empresa y territorio mediante programas medibles.</p>
          <div className="public-grid public-grid--cases">
            {foundationAreas.map((item) => (
              <article key={item.name} className="public-card">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'albatour') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <section className="public-hero albatour-hero">
            <p className="public-kicker">ALBATOUR · Mision 008</p>
            <h1>Experiencias con propósito</h1>
            <p>
              ALBATOUR deja de ser una agencia tradicional y se convierte en el operador de experiencias de ReproOrigen XXI, conectado con
              Fundacion, Campus y Biblioteca Viva.
            </p>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Vision Albatour</h2>
            <div className="public-grid public-grid--cases">
              {albatourPurposeExperiences.map((item) => (
                <article key={item.title} className="public-card albatour-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Lineas de servicio</h2>
            <div className="public-grid public-grid--cases">
              {albatourServiceLines.map((line) => (
                <article key={line.name} className="public-card albatour-card">
                  <h3>{line.name}</h3>
                  <p>{line.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Conectado con el ecosistema</h2>
            <div className="public-grid public-grid--cases">
              {[
                {
                  title: 'Fundación ReproOrigen XXI',
                  description: 'Reforestacion, Generacion Alfa y programas de impacto territorial.',
                  route: 'fundacion' as PublicRoute
                },
                {
                  title: 'Campus',
                  description: 'Itinerarios educativos para colegios, AMPAs y universidades.',
                  route: 'campus-reproorigen' as PublicRoute
                },
                {
                  title: 'Biblioteca Viva',
                  description: 'Rutas literarias y experiencias narrativas inspiradas en colecciones vivas.',
                  route: 'biblioteca-viva' as PublicRoute
                }
              ].map((item) => (
                <article key={item.title} className="public-card albatour-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button type="button" className="public-button" onClick={() => navigate(item.route)}>
                    Ir a {routeLabels[item.route]}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Alcance de esta fase</h2>
            <article className="public-card">
              <p>Arquitectura publica creada. No se implementan reservas, pagos ni backend en esta mision.</p>
            </article>
          </section>

          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'biblioteca-viva') {
      return (
        <section className="public-panel public-panel--stack">
          <PublicEcosystemNav currentRoute={currentRoute} onNavigate={navigate} />
          <section className="public-hero editorial-hero">
            <p className="public-kicker">Biblioteca Viva ReproOrigen XXI</p>
            <h1>Biblioteca Viva ReproOrigen XXI</h1>
            <p>Libros que ayudan a reflexionar y crecer, con lenguaje visual editorial inspirado en pergamino, luz y naturaleza.</p>
          </section>

          <div className="public-panel public-panel--stack editorial-panel">
            <h2>Fichas visuales</h2>
            <div className="public-grid public-grid--cases">
              {bibliotecaVivaCollections.map((item) => (
                <article key={item.name} className="public-card editorial-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="public-hero__actions">
            <button type="button" className="public-button public-button--primary" onClick={() => navigate('escuela-editorial')}>
              Ir a Escuela Editorial
            </button>
            <button type="button" className="public-button public-button--secondary" onClick={() => navigate('editorial-reproorigen')}>
              Ir a Editorial
            </button>
            <button type="button" className="public-button public-button--secondary" onClick={() => navigate('campus-reproorigen')}>
              Ir a Campus
            </button>
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'portal-cliente') {
      return (
        <>
          <ClientPortalView />
          <FinalCta onNavigate={navigate} />
        </>
      );
    }

    if (currentRoute === 'centro-configuracion') {
      return (
        <>
          <ConfigCenterView />
          <FinalCta onNavigate={navigate} />
        </>
      );
    }

    if (currentRoute === 'solicitar-diagnostico') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Solicitar Diagnostico</h1>
          <p>Primer paso comercial para entender necesidades, oportunidades y plan de accion por sector.</p>
          <div className="public-grid public-grid--cases">
            <article className="public-card">
              <h2>Que analizamos</h2>
              <p>Situacion operativa, potencial comercial, necesidades tecnicas, encaje de IA y oportunidades de subvencion.</p>
            </article>
            <article className="public-card">
              <h2>Que recibe el cliente</h2>
              <p>Informe de diagnostico, mapa de prioridades, plan inicial y propuesta de siguientes pasos.</p>
            </article>
            <article className="public-card">
              <h2>Duracion</h2>
              <p>Proceso de demostracion estimado entre 7 y 15 dias segun complejidad y alcance.</p>
            </article>
            <article className="public-card">
              <h2>Sectores</h2>
              <p>Empresas, ayuntamientos, comunidades, energia, turismo, agricultura, educacion y colaboradores.</p>
            </article>
          </div>
          <div className="public-hero__actions">
            <button type="button" className="public-button public-button--primary" onClick={() => navigate('solicitar-diagnostico')}>
              Solicitar diagnostico
            </button>
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'reservar-reunion') {
      return (
        <section className="public-contact">
          <div className="public-contact__copy">
            <h1>Reservar Reunion</h1>
            <p>Comparte tus datos y objetivos para preparar una reunion orientada a resultados.</p>
          </div>
          <div className="public-contact__forms">
            <DemoMeetingForm />
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'que-obtendra') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>¿Que obtendra?</h1>
          <p>Recorrido de valor de ReproOrigen XXI en modo demostracion comercial.</p>
          <div className="public-grid public-grid--workflow">
            {valueFlow.map((step, index) => (
              <article key={step} className="public-card">
                <h2>{step}</h2>
                {index < valueFlow.length - 1 ? <p>↓</p> : null}
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'impacto') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Impacto</h1>
          <p>Indicadores visuales de demostracion para reuniones con empresas, ayuntamientos y colaboradores.</p>
          <div className="public-grid public-grid--cases">
            {impactCards.map((item) => (
              <article key={item.title} className="public-card">
                <h2>{item.title}</h2>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'centro-direccion') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Sala de Direccion ReproOrigen XXI</h1>
          <p>Panel ejecutivo de demostracion para seguimiento integral del ecosistema.</p>

          <section className="public-panel public-panel--stack">
            <h2>{dawnOfficialSchedule.title}</h2>
            <p className="public-kicker">{dawnOfficialSchedule.subtitle}</p>
            <p>{dawnOfficialSchedule.principle}</p>
            <p><strong>Ritual:</strong> {dawnOfficialSchedule.duration}</p>

            <div className="public-grid public-grid--cases">
              {dawnOfficialSchedule.blocks.map((block) => (
                <article key={block.range} className="public-card public-card--highlight">
                  <p className="public-kicker">{block.range}</p>
                  <h3>{block.title}</h3>
                  <ul className="public-tree-list">
                    {block.actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <article className="public-card public-card--highlight">
              <h3>Lema del Amanecer</h3>
              <p>{dawnOfficialSchedule.dawnMotto}</p>
            </article>

            <article className="public-card">
              <h3>Firma Oficial del Lunes</h3>
              <ul className="public-tree-list">
                {dawnOfficialSchedule.mondaySignature.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Modo Operativo 06:34</h2>
            <p>Checklist interactivo para dirigir el dia antes de abrir comunicaciones externas.</p>
            <article className="public-card public-card--highlight">
              <p><strong>Progreso de hoy:</strong> {completedDawnTasks}/{dawnChecklistItems.length} tareas completadas ({dawnProgress}%)</p>
              <div className="public-hero__actions">
                <button type="button" className="public-button public-button--primary" onClick={startDawnRitual}>
                  Iniciar ritual 06:34
                </button>
                <button type="button" className="public-button public-button--secondary" onClick={saveDawnSummary}>
                  Guardar registro diario
                </button>
              </div>
            </article>

            <div className="public-grid public-grid--cases">
              {dawnChecklistItems.map((item) => (
                <label key={item.id} className="public-card ritual-checklist-item">
                  <p className="public-kicker">{item.block}</p>
                  <div className="ritual-checklist-row">
                    <input
                      type="checkbox"
                      checked={Boolean(dawnChecklist[item.id])}
                      onChange={() => toggleDawnTask(item.id)}
                    />
                    <span>{item.task}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="public-grid public-grid--cases">
              <article className="public-card">
                <h3>Decision estrategica del dia</h3>
                <textarea
                  rows={4}
                  placeholder="Escribe la decision mas importante del dia..."
                  value={dawnDecision}
                  onChange={(event) => setDawnDecision(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Accion obligatoria antes de las 10:00</h3>
                <textarea
                  rows={4}
                  placeholder="Define la accion que se ejecuta antes de las 10:00..."
                  value={dawnActionBeforeTen}
                  onChange={(event) => setDawnActionBeforeTen(event.target.value)}
                />
              </article>
            </div>

            {dawnStatus ? <p className="public-form__status">{dawnStatus}</p> : null}
          </section>

          <section className="public-panel public-panel--stack">
            <h2>{weeklyDirectionRitual.name}</h2>
            <p className="public-kicker">{weeklyDirectionRitual.subtitle}</p>
            <p>{weeklyDirectionRitual.intro}</p>

            <div className="public-grid public-grid--cases">
              {weeklyDirectionRitual.sections.map((section) => (
                <article key={section.title} className="public-card public-card--highlight">
                  <h3>{section.title}</h3>
                  <ul className="public-tree-list">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <article className="public-card public-card--highlight">
              <h3>Cierre Oficial del Director IA</h3>
              <p>{weeklyDirectionRitual.closingMessage}</p>
            </article>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Acta Semanal de Direccion</h2>
            <p>Registro ejecutivo de la semana para mantener foco, trazabilidad y aprendizaje del Consejo de Direccion.</p>

            <article className="public-card public-card--highlight">
              <p><strong>Semana activa:</strong> {weekLabelFromDate(new Date())}</p>
              <p><strong>Estado del ritual:</strong> {dawnStateLabel}</p>
              <p><strong>Inicio:</strong> {dawnStartLabel} · <strong>Cierre:</strong> {dawnCloseLabel}</p>
              <p><strong>Duracion registrada:</strong> {dawnDurationMinutes} minutos</p>
            </article>

            <div className="public-grid public-grid--cases">
              <article className="public-card">
                <h3>Objetivo principal de la semana</h3>
                <textarea
                  rows={4}
                  placeholder="Define la mision principal de la semana..."
                  value={weeklyObjective}
                  onChange={(event) => setWeeklyObjective(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Decision estrategica</h3>
                <textarea
                  rows={4}
                  placeholder="Escribe la decision estrategica semanal..."
                  value={weeklyStrategicDecision}
                  onChange={(event) => setWeeklyStrategicDecision(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Accion obligatoria en 24 horas</h3>
                <textarea
                  rows={4}
                  placeholder="Define la accion que se ejecuta en las proximas 24 horas..."
                  value={weeklyAction24h}
                  onChange={(event) => setWeeklyAction24h(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Resultados medibles</h3>
                <textarea
                  rows={4}
                  placeholder="Anota los resultados clave alcanzados..."
                  value={weeklyResults}
                  onChange={(event) => setWeeklyResults(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Aprendizajes de la semana</h3>
                <textarea
                  rows={4}
                  placeholder="Resume los aprendizajes principales..."
                  value={weeklyLearnings}
                  onChange={(event) => setWeeklyLearnings(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Estado de Arquitectos IA</h3>
                <textarea
                  rows={4}
                  placeholder="Detalla avances, bloqueos y prioridades de Arquitectos IA..."
                  value={weeklyArchitectsStatus}
                  onChange={(event) => setWeeklyArchitectsStatus(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Reflexion: Que construimos</h3>
                <textarea
                  rows={4}
                  placeholder="Sintetiza lo construido esta semana..."
                  value={weeklyReflectionBuilt}
                  onChange={(event) => setWeeklyReflectionBuilt(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Reflexion: Que aprendimos</h3>
                <textarea
                  rows={4}
                  placeholder="Sintetiza lo aprendido esta semana..."
                  value={weeklyReflectionLearned}
                  onChange={(event) => setWeeklyReflectionLearned(event.target.value)}
                />
              </article>
              <article className="public-card">
                <h3>Reflexion: Que legado dejamos</h3>
                <textarea
                  rows={4}
                  placeholder="Sintetiza el legado generado esta semana..."
                  value={weeklyReflectionLegacy}
                  onChange={(event) => setWeeklyReflectionLegacy(event.target.value)}
                />
              </article>
            </div>

            <div className="public-hero__actions">
              <button type="button" className="public-button public-button--primary" onClick={saveWeeklyActa}>
                Sellar acta semanal
              </button>
            </div>

            {weeklyStatusMessage ? <p className="public-form__status">{weeklyStatusMessage}</p> : null}

            <section className="public-panel public-panel--stack">
              <h3>Historial de actas</h3>
              <div className="public-grid public-grid--cases">
                {weeklyActas.length === 0 ? (
                  <article className="public-card">
                    <p>No hay actas semanales registradas todavia.</p>
                  </article>
                ) : (
                  weeklyActas.map((acta) => (
                    <article key={acta.weekKey} className="public-card">
                      <h4>{acta.label}</h4>
                      <p><strong>Estado:</strong> {acta.ritualState}</p>
                      <p><strong>Objetivo:</strong> {acta.objective || 'Pendiente de definir'}</p>
                      <p><strong>Decision:</strong> {acta.strategicDecision || 'Pendiente de definir'}</p>
                      <p><strong>Accion 24h:</strong> {acta.action24h || 'Pendiente de definir'}</p>
                    </article>
                  ))
                )}
              </div>
            </section>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Rituales Oficiales de Direccion</h2>
            <div className="public-grid public-grid--cases">
              {officialDirectionRituals.map((ritual) => (
                <article key={ritual.title} className="public-card">
                  <h3>{ritual.title}</h3>
                  <p><strong>Frecuencia:</strong> {ritual.frequency}</p>
                  <p><strong>Duracion:</strong> {ritual.duration}</p>
                  <p><strong>Proposito:</strong> {ritual.purpose}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Estado del Ecosistema</h2>
            <div className="public-grid public-grid--cases">
              {ecosystemStatus.map((item) => (
                <article key={item.area} className="public-card">
                  <h3>{item.area}</h3>
                  <p>{item.status}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="public-panel public-panel--stack">
            <h2>Fiscal y Contabilidad · Dia 1</h2>
            <p>Configuracion editable desde Direccion para moneda, umbral de vencimiento y caja inicial del tablero.</p>

            <form className="public-card fiscal-config-form" onSubmit={saveFiscalConfig}>
              <div className="fiscal-config-form__grid">
                <label>
                  Moneda
                  <select
                    value={fiscalDashboardConfig.currency}
                    onChange={(event) =>
                      setFiscalDashboardConfig((prev) => ({ ...prev, currency: event.target.value as 'EUR' }))
                    }
                  >
                    <option value="EUR">EUR (€)</option>
                  </select>
                </label>

                <label>
                  Umbral alerta roja (dias)
                  <input
                    type="number"
                    min={1}
                    value={fiscalDashboardConfig.overdueThresholdDays}
                    onChange={(event) =>
                      setFiscalDashboardConfig((prev) => ({
                        ...prev,
                        overdueThresholdDays: Math.max(1, Number(event.target.value || 1))
                      }))
                    }
                  />
                </label>

                <label>
                  Caja inicial estimada
                  <input
                    type="number"
                    step="0.01"
                    value={fiscalDashboardConfig.initialCash}
                    onChange={(event) =>
                      setFiscalDashboardConfig((prev) => ({
                        ...prev,
                        initialCash: Number(event.target.value || 0)
                      }))
                    }
                  />
                </label>
              </div>

              <div className="public-hero__actions">
                <button type="submit" className="public-button public-button--primary">Guardar configuracion fiscal</button>
              </div>
              {fiscalStatusMessage ? <p className="public-form__status">{fiscalStatusMessage}</p> : null}
            </form>

            <div className="public-grid public-grid--cases">
              <article className="public-card public-card--highlight">
                <h3>Pendiente de cobro</h3>
                <p>{formatMoney(fiscalKpis.pendienteDeCobro)}</p>
              </article>
              <article className="public-card public-card--highlight">
                <h3>Facturas vencidas</h3>
                <p>{overdueInvoices.length}</p>
              </article>
              <article className="public-card public-card--highlight">
                <h3>Caja estimada</h3>
                <p>{formatMoney(estimatedCash)}</p>
              </article>
            </div>

            <div className="public-grid public-grid--cases">
              <article className="public-card">
                <h3>Alerta roja · Factura vencida</h3>
                <p>{overdueInvoices.length} facturas superan el umbral de {fiscalDashboardConfig.overdueThresholdDays} dias.</p>
                <ul className="public-tree-list">
                  {overdueInvoices.slice(0, 5).map((invoice) => (
                    <li key={invoice.id}>
                      {invoice.codigo} · {formatMoney(invoice.saldoPendiente)} pendientes
                    </li>
                  ))}
                </ul>
              </article>

              <article className="public-card">
                <h3>Alerta naranja · Cobro parcial</h3>
                <p>{partialCollectionInvoices.length} facturas con cobros parciales.</p>
                <ul className="public-tree-list">
                  {partialCollectionInvoices.slice(0, 5).map((invoice) => (
                    <li key={invoice.id}>
                      {invoice.codigo} · pendiente {formatMoney(invoice.saldoPendiente)}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="public-card">
                <h3>Alerta critica · Riesgo impago</h3>
                <p>{unpaidRiskInvoices.length} facturas en riesgo alto de impago.</p>
                <ul className="public-tree-list">
                  {unpaidRiskInvoices.slice(0, 5).map((invoice) => (
                    <li key={invoice.id}>
                      {invoice.codigo} · {daysSince(invoice.fechaEmision)} dias desde emision
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <div className="public-grid public-grid--cases">
            {executiveBlocks.map((block) => (
              <article key={block.title} className="public-card">
                <h2>{block.title}</h2>
                {block.indicators.map((indicator) => (
                  <p key={indicator.name}><strong>{indicator.name}:</strong> {indicator.value}</p>
                ))}
                <button type="button" className="public-button" onClick={() => navigate(block.route)}>
                  Ver detalle
                </button>
              </article>
            ))}
          </div>

          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'contacto') {
      return (
        <section className="public-contact">
          <div className="public-contact__copy">
            <h1>Contacto</h1>
            <p>Cuéntanos qué necesitas y preparamos una propuesta inicial para tu organización.</p>
            <p>Este formulario no guarda datos todavía y queda listo para conectar al CRM en la siguiente misión.</p>
            <div className="public-hero__actions">
              <button type="button" className="public-button public-button--primary" onClick={() => navigate('solicitar-diagnostico')}>
                Solicitar diagnóstico
              </button>
              <button type="button" className="public-button public-button--secondary" onClick={() => navigate('reservar-reunion')}>
                Reservar reunión
              </button>
            </div>
          </div>
          <div className="public-contact__forms">
            <PublicContactForm />
            <MeetingReservationCard />
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'aviso-legal') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Aviso Legal</h1>
          <div className="public-grid public-grid--cases">
            <article className="public-card">
              <h2>Titular del sitio</h2>
              <p>{publicConfig.companyName}</p>
              <p>Dominio: {publicConfig.domain}</p>
            </article>
            <article className="public-card">
              <h2>Contacto</h2>
              <p>Email: {publicConfig.corporateEmail}</p>
              <p>Teléfono: {publicConfig.phone}</p>
              <p>Dirección: {publicConfig.address}</p>
            </article>
            <article className="public-card">
              <h2>Condiciones de uso</h2>
              <p>El acceso y uso de esta web implica la aceptación de uso lícito de contenidos, marca e identidad visual.</p>
            </article>
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'privacidad') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Política de Privacidad</h1>
          <div className="public-grid public-grid--cases">
            <article className="public-card">
              <h2>Tratamiento de datos</h2>
              <p>Los formularios actuales son demostrativos y no persisten datos en esta fase de producción previa al CRM.</p>
            </article>
            <article className="public-card">
              <h2>Finalidad</h2>
              <p>Cuando se conecte el CRM, los datos se utilizarán exclusivamente para responder solicitudes comerciales y de colaboración.</p>
            </article>
            <article className="public-card">
              <h2>Derechos</h2>
              <p>Puedes solicitar acceso, rectificación o supresión escribiendo a {publicConfig.corporateEmail}.</p>
            </article>
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    if (currentRoute === 'cookies') {
      return (
        <section className="public-panel public-panel--stack">
          <h1>Política de Cookies</h1>
          <div className="public-grid public-grid--cases">
            <article className="public-card">
              <h2>Estado actual</h2>
              <p>La web pública no activa cookies de analítica ni publicidad en esta versión.</p>
            </article>
            <article className="public-card">
              <h2>Cookies técnicas</h2>
              <p>Solo pueden utilizarse elementos técnicos mínimos del navegador para navegación y renderizado.</p>
            </article>
            <article className="public-card">
              <h2>Actualización</h2>
              <p>Si se incorporan cookies no técnicas, se habilitará panel de consentimiento antes de su activación.</p>
            </article>
          </div>
          <FinalCta onNavigate={navigate} />
        </section>
      );
    }

    return (
      <section className="public-panel">
        <h1>{routeLabels[currentRoute]}</h1>
        <p>Información legal básica preparada para publicación.</p>
        <FinalCta onNavigate={navigate} />
      </section>
    );
  };

  return (
    <div className="public-app">
      {!accessAccepted ? (
        <AccessConditionsGate onAccept={() => setAccessAccepted(true)} />
      ) : (
        <>
      <header className="public-header">
        <button type="button" className="public-header__brand" onClick={() => navigate('inicio')}>
          <span className="public-header__seal" aria-hidden>
            <img src="/sello-reproorigen-oficial.png" alt="" loading="lazy" decoding="async" />
          </span>
          <span className="public-header__brand-copy">
            <strong>{publicConfig.companyName}</strong>
            <p>{publicConfig.slogan}</p>
          </span>
        </button>
        <button type="button" className="public-header__menu" onClick={() => setNavOpen((prev) => !prev)} aria-expanded={navOpen} aria-label="Abrir navegación">
          Menú
        </button>
        <PublicTopNav currentRoute={currentRoute} isOpen={navOpen} onNavigate={navigate} />
      </header>
      <main>{renderPage()}</main>
      <PublicFooter onNavigate={navigate} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <OSProvider>
      <PublicPage />
    </OSProvider>
  );
}
