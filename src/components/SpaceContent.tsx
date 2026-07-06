import { motion } from 'framer-motion';
import type { ModuleKey } from '../types';
import { useOS } from '../context/OSContext';
import { ContactForm } from './ContactForm';
import { LeadCaptureForm } from './LeadCaptureForm';
import { SectionHero } from './SectionHero';
import { SectionTitle } from './SectionTitle';
import { EditorialBlock } from './EditorialBlock';
import { CapabilityGrid } from './CapabilityGrid';
import { TransformationCase } from './TransformationCase';
import { MethodologyTimeline } from './MethodologyTimeline';
import { ImpactSection } from './ImpactSection';
import { CTASection } from './CTASection';
import { PremiumCard } from './PremiumCard';
import { QuoteBlock } from './QuoteBlock';
import { WorkflowSection } from './WorkflowSection';

const fadeUp = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.98 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

const sectionFade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
});

const SPACE_TEMPLATES: Record<ModuleKey, {
  label: string;
  hero: { eyebrow: string; title: string; description: string };
  introduction: Array<{ heading: string; copy: string }>;
  sections: string[];
  highlight: { title: string; description: string };
  capabilities: Array<{ title: string; text: string }>;
  cases: Array<{ title: string; description: string }>;
  methodology: Array<{ step: string; description: string }>;
  workflow?: { nodes: { id: string; label: string }[]; connections?: Array<[number, number]> };
  impact: Array<{ metric: string; detail: string }>;
  cta: { title: string; description: string };
  quote?: { quote: string; attribution: string };
}> = {
  empresas: {
    label: 'EMPRESAS',
    hero: {
      eyebrow: 'ESPACIO EMPRESAS',
      title: 'Diseñar el futuro empresarial desde el territorio.',
      description: 'Cada propuesta se construye a partir del paisaje, la historia y la confianza.'
    },
    introduction: [
      { heading: 'Mensaje principal', copy: 'Las empresas del Alto Mijares no solo definen productos: activan paisajes, comunidades y una nueva forma de hacer empresa.' }
    ],
    sections: ['Automatización', 'IA', 'CRM', 'Subvenciones', 'Consultoría', 'Contacto'],
    highlight: { title: 'Precisión editorial y territorio activo', description: 'Cada palabra construye confianza y la identidad local se vuelve una ventaja competitiva con propuestas serenas y consolidadas.' },
    capabilities: [
      { title: 'Identidad de marca', text: 'Narrativas, naming y posicionamiento con raíces y elegancia.' },
      { title: 'Servicios experienciales', text: 'Mapas de oferta que integran producto, turismo y paisaje.' },
      { title: 'Comunicación sensible', text: 'Materiales claros, visuales limpios y mensajes creíbles.' },
      { title: 'Alianzas estratégicas', text: 'Redes entre municipio, empresa, cultura y comunidad.' }
    ],
    cases: [
      { title: 'Marca patrimonial', description: 'Del taller local al relato con presencia nacional.' },
      { title: 'Oferta experiencial', description: 'Propuesta que integra producto, naturaleza y visitante.' }
    ],
    methodology: [
      { step: 'Comprender el paisaje', description: 'La empresa, el origen y el propósito definen los primeros pasos.' },
      { step: 'Definir la visión', description: 'Oferta y puntos de encuentro se alinean con el territorio.' },
      { step: 'Activar proyectos', description: 'Narrativas claras y herramientas prácticas impulsan el proceso.' },
      { step: 'Ajustar con criterio', description: 'Medir impacto para asegurar permanencia.' }
    ],
    workflow: {
      nodes: [
        { id: 'detect', label: 'Detectan necesidades' },
        { id: 'analyze', label: 'Analiza el proyecto' },
        { id: 'helps', label: 'Busca ayudas disponibles' },
        { id: 'select', label: 'Selecciona colaboradores' },
        { id: 'coord', label: 'Coordina profesionales' },
        { id: 'execute', label: 'Ejecución' },
        { id: 'follow', label: 'Seguimiento' },
        { id: 'impact', label: 'Impacto en el territorio' }
      ]
    },
    impact: [
      { metric: '+25%', detail: 'Reconocimiento de marca en mercados afines.' },
      { metric: '3', detail: 'Programas de servicio diseñados para público local y visitante.' },
      { metric: 'Impacto tangible', detail: 'Relatos que elevan valor sin perder autenticidad.' }
    ],
    cta: { title: 'Formulario contextual', description: 'Comparte tu desafío y conectaremos la propuesta de valor con el ecosistema del Alto Mijares.' },
    quote: { quote: 'El espacio premium es la plantilla para los demás ámbitos del ecosistema.', attribution: 'ReproOrigen XXI' }
  },
  hogar: {
    label: 'HOGAR',
    hero: { eyebrow: 'ESPACIO HOGAR', title: 'Transformar el hogar en un refugio con propósito.', description: 'Este espacio revela cómo los proyectos domésticos pueden convertirse en experiencias coherentes y llenas de cuidado.' },
    introduction: [ { heading: 'Mensaje principal', copy: 'El hogar se convierte en una extensión del entorno, con diseño pensado para bienestar, raíces y estilo de vida.' } ],
    sections: ['Ventanas', 'Reformas', 'Solar', 'Ayudas', 'Contacto'],
    highlight: { title: 'Arquitectura sensible para lo cotidiano', description: 'Soluciones ordenadas, calmadas y con materiales nobles que respetan tiempos y espacios.' },
    capabilities: [ { title: 'Arquitectura sensible', text: 'Proyectos que dialogan con la geografía y el ritmo doméstico.' }, { title: 'Ambientes memorables', text: 'Espacios interiores que respiran calma y claridad.' }, { title: 'Servicios personalizados', text: 'Paquetes adaptados a vida rural, digital y comunitaria.' }, { title: 'Relatos de hogar', text: 'Historias que conectan el interior con los alrededores.' } ],
    cases: [ { title: 'Casa integrada', description: 'Viviendas que fortalecen la relación con paisaje y familia.' }, { title: 'Estancia cuidada', description: 'Proyectos que equilibran funcionalidad y atmósfera.' } ],
    methodology: [ { step: 'Escuchar el hogar', description: 'Rutinas y deseos definen el espacio.' }, { step: 'Diseñar con sentido', description: 'Respuestas claras a persona y lugar.' }, { step: 'Cuidar los detalles', description: 'Materialidad y atmósfera se ajustan con atención.' }, { step: 'Acompañar la implementación', description: 'Presencia discreta durante el proceso.' } ],
    workflow: { nodes: [ { id: 'detect', label: 'Detectan necesidades' }, { id: 'analyze', label: 'Analiza el proyecto' }, { id: 'helps', label: 'Busca ayudas disponibles' }, { id: 'select', label: 'Selecciona colaboradores' }, { id: 'coord', label: 'Coordina profesionales' }, { id: 'execute', label: 'Ejecución' }, { id: 'follow', label: 'Seguimiento' } ] },
    impact: [ { metric: '80%', detail: 'Mayor satisfacción con el uso del espacio.' }, { metric: '4', detail: 'Propuestas de bienestar para el hogar y su entorno.' }, { metric: 'Calidad duradera', detail: 'Ambientes diseñados para perdurar.' } ],
    cta: { title: 'Formulario contextual', description: 'Comparte tu desafío y conectaremos la propuesta de valor con el ecosistema del Alto Mijares.' }
  },
  territorio: {
    label: 'TERRITORIO',
    hero: { eyebrow: 'ESPACIO TERRITORIO', title: 'Crear territorios que cuenten historias auténticas.', description: 'Un espacio para descubrir cómo el territorio se puede narrar con respeto y elegancia.' },
    introduction: [ { heading: 'Mensaje principal', copy: 'Trabajamos con paisajes, tradiciones y recursos locales para que el territorio se vuelva un activo estratégico.' } ],
    sections: ['Municipios', 'Reforestación', 'Proyectos', 'Turismo', 'Comunidad'],
    highlight: { title: 'Diseño territorial con valor colectivo', description: 'Intervenciones que armonizan lugar, patrimonio y relato compartido.' },
    capabilities: [ { title: 'Diseño territorial', text: 'Propuestas que armonizan naturaleza, lugar y programa.' }, { title: 'Activación cultural', text: 'Programas que miran al pasado y proyectan el futuro.' }, { title: 'Itinerarios de descubrimiento', text: 'Rutas y experiencias que celebran el entorno.' }, { title: 'Vínculos estratégicos', text: 'Colaboraciones entre emprendimientos y municipios.' } ],
    cases: [ { title: 'Paisaje activo', description: 'Intervenciones que revalorizan sectores rurales.' }, { title: 'Circuito local', description: 'Proyectos que conectan recursos, visitantes y comunidad.' } ],
    methodology: [ { step: 'Mapear el territorio', description: 'Identificar elementos clave y actores locales.' }, { step: 'Diseñar con coherencia', description: 'Propuestas que respetan el ritmo local.' }, { step: 'Integrar actores', description: 'Recursos y narrativas se combinan en un relato común.' }, { step: 'Medir impacto', description: 'Resultados sobre lugar y personas guían el ajuste.' } ],
    workflow: { nodes: [ { id: 'proyecto', label: 'Proyecto' }, { id: 'analisis', label: 'Análisis' }, { id: 'subvenciones', label: 'Subvenciones disponibles' }, { id: 'colaboradores', label: 'Colaboradores' }, { id: 'ejecucion', label: 'Ejecución' }, { id: 'impacto', label: 'Impacto' } ] },
    impact: [ { metric: '6', detail: 'Proyectos territoriales en marcha.' }, { metric: 'Relación activa', detail: 'Nuevos puentes entre actores locales.' }, { metric: 'Trayectoria sostenible', detail: 'Valor entregado con criterio a largo plazo.' } ],
    cta: { title: 'Formulario contextual', description: 'Comparte tu desafío y conectaremos la propuesta de valor con el ecosistema del Alto Mijares.' }
  },
  formacion: {
    label: 'FORMACIÓN',
    hero: { eyebrow: 'ESPACIO FORMACIÓN', title: 'Diseñar formación que conecte saberes y acciones.', description: 'Un espacio para programas que empoderan talento local y poseen una estética de aprendizaje cuidada.' },
    introduction: [ { heading: 'Mensaje principal', copy: 'La formación se plantea como un trayecto humanizado, práctico y alineado con el territorio.' } ],
    sections: [],
    highlight: { title: 'Formación con estructura y calidez', description: 'Contenidos prácticos que respetan contexto, ritmo y resultado.' },
    capabilities: [ { title: 'Programas modulares', text: 'Estructuras formativas adaptables y consistentes.' }, { title: 'Herramientas prácticas', text: 'Materiales que se aplican desde el primer día.' }, { title: 'Sesiones inmersivas', text: 'Experiencias que combinan teoría con entorno real.' }, { title: 'Red de aprendizaje', text: 'Círculos que fortalecen el tejido local.' } ],
    cases: [ { title: 'Formación rural', description: 'Programas diseñados para perfiles de municipio y empresa local.' }, { title: 'Aprendizaje activo', description: 'Sesiones que generan cambios concretos en el terreno.' } ],
    methodology: [ { step: 'Entender al grupo', description: 'Objetivos y necesidades marcan el diseño.' }, { step: 'Construir itinerarios', description: 'Estructuras claras y adaptativas se alinean con el ritmo.' }, { step: 'Producir contenidos', description: 'Material con tono cercano y profesional.' }, { step: 'Evaluar resultados', description: 'Resultados reales permiten ajustar el ciclo siguiente.' } ],
    workflow: {
      nodes: [
        { id: 'centro-educativo', label: 'Centro educativo' },
        { id: 'solicita-experiencia', label: 'Solicita una experiencia' },
        { id: 'reproorigen', label: 'ReproOrigen XXI' },
        { id: 'disena-actividad', label: 'Diseña la actividad' },
        { id: 'colabora-municipio', label: 'Colabora con el municipio' },
        { id: 'jornada-naturaleza', label: 'Jornada de naturaleza' },
        { id: 'plantacion-arboles', label: 'Plantación de árboles' },
        { id: 'educacion-ambiental', label: 'Educación ambiental' },
        { id: 'seguimiento-bosque', label: 'Seguimiento del bosque' },
        { id: 'impacto-real', label: 'Impacto real' }
      ]
    },
    impact: [ { metric: '7', detail: 'Iniciativas formativas apoyadas.' }, { metric: 'Mayor confianza', detail: 'Participantes con herramientas útiles.' }, { metric: 'Conexión real', detail: 'Saber aplicado al contexto local.' } ],
    cta: { title: 'Formulario contextual', description: 'Comparte tu desafío y conectaremos la propuesta de valor con el ecosistema del Alto Mijares.' }
  },
  comunidad: {
    label: 'COMUNIDAD',
    hero: { eyebrow: 'ESPACIO COMUNIDAD', title: 'Pensar comunidades que se apoyan y avanzan juntas.', description: 'Un lugar donde las conexiones sociales se convierten en acciones con sentido y belleza.' },
    introduction: [ { heading: 'Mensaje principal', copy: 'La comunidad es un activo real, y aquí se plantea con cuidado, inclusión y continuidad.' } ],
    sections: [],
    highlight: { title: 'Estrategias para activar el tejido local', description: 'Participación, comunicación y encuentros construyen valor social sostenible.' },
    capabilities: [ { title: 'Estrategias de participación', text: 'Metodologías para activar voces y acciones.' }, { title: 'Comunicación comunitaria', text: 'Relatos que refuerzan el sentido de pertenencia.' }, { title: 'Eventos de encuentro', text: 'Programas que generan cohesión y visibilidad.' }, { title: 'Redes de cuidado', text: 'Apoyos sólidos entre personas, asociaciones y empresas.' } ],
    cases: [ { title: 'Comunidad viva', description: 'Proyectos que revivieron espacios comunes.' }, { title: 'Red colaborativa', description: 'Alianzas que multiplican recursos y confianza.' } ],
    methodology: [ { step: 'Escuchar actores', description: 'Recoger perspectivas diversas y necesidades reales.' }, { step: 'Construir propuestas', description: 'Programas inclusivos y accesibles se plasman con cuidado.' }, { step: 'Crear encuentros', description: 'Espacios compartidos para trabajo y encuentro.' }, { step: 'Acompañar prácticas', description: 'Sostenibilidad y seguimiento en el tiempo.' } ],
    workflow: { nodes: [] },
    impact: [ { metric: '12', detail: 'Encuentros y acciones comunitarias realizadas.' }, { metric: 'Mayor conexión', detail: 'Relaciones fortalecidas entre actores.' }, { metric: 'Valor social', detail: 'Proyectos con impacto tangible en el territorio.' } ],
    cta: { title: 'Formulario contextual', description: 'Comparte tu desafío y conectaremos la propuesta de valor con el ecosistema del Alto Mijares.' }
  },
  experiencias: {
    label: 'EXPERIENCIAS',
    hero: { eyebrow: 'ESPACIO EXPERIENCIAS', title: 'Construir experiencias que permanezcan en la memoria.', description: 'Este espacio dirige el diseño de propuestas vivas, testadas en el paisaje y pensadas para descubrir.' },
    introduction: [ { heading: 'Mensaje principal', copy: 'Las experiencias se articulan con el entorno y con el visitante, generando un relato coherente y sereno.' } ],
    sections: [],
    highlight: { title: 'Propuestas vivas con ritmo y calma', description: 'Momentos pensados para el visitante que respetan el paisaje y el servicio.' },
    capabilities: [ { title: 'Concepto experiencial', text: 'Historias que guían cada paso del recorrido.' }, { title: 'Diseño de momentos', text: 'Encuentros con sentido, ritmo y serenidad.' }, { title: 'Producción cuidada', text: 'Material y entorno armonizados para el visitante.' }, { title: 'Evaluación de impacto', text: 'Feedback real que mejora la propuesta con calma.' } ],
    cases: [ { title: 'Recorrido inmersivo', description: 'Experiencias que conectan paisaje, producto y visitante.' }, { title: 'Estancias con propósito', description: 'Propuestas configuradas para una experiencia rural premium.' } ],
    methodology: [ { step: 'Definir la emoción', description: 'La experiencia se desarrolla alrededor de un relato central.' }, { step: 'Construir estructura', description: 'Momentos coherentes con ritmo y pausa.' }, { step: 'Sincronizar ambiente', description: 'Narrativa, servicio y entorno se alinean.' }, { step: 'Medir impacto', description: 'Feedback real perfecciona la sensación.' } ],
    workflow: { nodes: [] },
    impact: [ { metric: '4', detail: 'Experiencias diseñadas y lanzadas.' }, { metric: 'Retención superior', detail: 'Visitantes que regresan y recomiendan.' }, { metric: 'Ecosistema activo', detail: 'Proyectos que refuerzan la red local.' } ],
    cta: { title: 'Formulario contextual', description: 'Comparte tu desafío y conectaremos la propuesta de valor con el ecosistema del Alto Mijares.' }
  }
};

type SpaceContentProps = {
  activeModule: ModuleKey | null;
};

export function SpaceContent({ activeModule }: SpaceContentProps) {
  const { updateOS } = useOS();

  if (!activeModule) {
    return (
      <motion.div className="space-placeholder" {...fadeUp}>
        <span>ESPACIO</span>
        <h3>Selecciona un área para explorar su atmósfera.</h3>
        <p>Cada espacio nace desde el sello central y se despliega con calma como una propuesta de descubrimiento.</p>
      </motion.div>
    );
  }

  const template = SPACE_TEMPLATES[activeModule];

  return (
    <motion.div className="space-content" {...fadeUp}>
      <motion.div {...sectionFade(0.05)}>
        <SectionHero
          eyebrow={template.hero.eyebrow}
          title={template.hero.title}
          description={template.hero.description}
          actions={
            <div className="section-hero__action-group">
              <button type="button">Explorar capacidades</button>
              <button type="button" className="section-hero__button-secondary" onClick={() => updateOS({ activeModule: null })}>
                Regresar al Ecosistema
              </button>
            </div>
          }
        />
      </motion.div>

      <motion.section className="space-section" {...sectionFade(0.2)}>
        <SectionTitle title="Introducción" />
        {template.introduction.map((item) => (
          <EditorialBlock key={item.heading} heading={item.heading} copy={item.copy} />
        ))}
      </motion.section>

      <motion.section className="space-section" {...sectionFade(0.35)}>
        <SectionTitle title="Despliegue premium" subtitle={template.highlight.title} />
        <PremiumCard title={template.highlight.title} description={template.highlight.description} />

        {template.sections && template.sections.length > 0 ? (
          <div className="space-subsections">
            <SectionTitle title="Áreas" />
            <div className="space-subsections__list">
              {template.sections.map((s) => (
                <PremiumCard key={s} title={s} description={''} />
              ))}
            </div>
          </div>
        ) : null}
      </motion.section>

      <motion.section className="space-section" {...sectionFade(0.5)}>
        <SectionTitle title="Capacidades" />
        <CapabilityGrid items={template.capabilities} />
      </motion.section>

      <motion.section className="space-section" {...sectionFade(0.65)}>
        <SectionTitle title="Casos de transformación" />
        <div className="transformation-grid">
          {template.cases.map((item) => (
            <TransformationCase key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </motion.section>

      <motion.section className="space-section" {...sectionFade(0.8)}>
        <SectionTitle title="Metodología" />
        <MethodologyTimeline items={template.methodology} />
      </motion.section>

      {template.workflow && template.workflow.nodes && template.workflow.nodes.length > 0 ? (
        <motion.section className="space-section" {...sectionFade(0.95)}>
          <SectionTitle title="Flujo" subtitle="Recorrido natural" />
          <WorkflowSection nodes={template.workflow.nodes} connections={template.workflow.connections} />
        </motion.section>
      ) : null}

      <motion.section className="space-section" {...sectionFade(1.1)}>
        <SectionTitle title="Impacto" />
        <ImpactSection items={template.impact} />
      </motion.section>

      {template.quote ? (
        <motion.section className="space-section" {...sectionFade(1.25)}>
          <QuoteBlock quote={template.quote.quote} attribution={template.quote.attribution} />
        </motion.section>
      ) : null}

      <motion.section className="space-section" {...sectionFade(1.4)}>
        <CTASection title={template.cta.title} description={template.cta.description} actions={
          <div className="cta-section__forms">
            <ContactForm />
            <LeadCaptureForm />
          </div>
        } />
      </motion.section>
    </motion.div>
  );
}
