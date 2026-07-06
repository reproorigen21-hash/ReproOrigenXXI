export const observatoryAgent = {
  name: 'Agente Observatorio',
  mission: 'Vigilar oportunidades para el territorio.',
  flow: [
    {
      name: 'Agente Observatorio',
      mission: 'Detectar señales del entorno y recopilar información relevante.',
      outputs: ['Noticias', 'BOE', 'DOGV', 'Agenda cultural', 'Ferias', 'Fiestas patronales']
    },
    {
      name: 'Agente Análisis',
      mission: 'Interpretar la información y detectar patrones, riesgos y oportunidades.',
      outputs: ['Resumen contextual', 'Mapeo de tendencias', 'Prioridades estratégicas']
    },
    {
      name: 'Agente Investigación',
      mission: 'Profundizar en los temas más relevantes para validar la información.',
      outputs: ['Antecedentes', 'Fuentes contrastadas', 'Hallazgos clave']
    },
    {
      name: 'Agente Financiación',
      mission: 'Identificar ayudas, subvenciones y recursos compatibles con los proyectos.',
      outputs: ['Oportunidades de financiación', 'Requisitos', 'Plazos']
    },
    {
      name: 'Agente Documentación',
      mission: 'Transformar los hallazgos en documentos útiles y presentables.',
      outputs: ['Memorias', 'Informes', 'Bases de apoyo']
    },
    {
      name: 'Agente Proyectos',
      mission: 'Convertir la información en propuestas accionables para el territorio.',
      outputs: ['Propuestas', 'Roadmaps', 'Plan de actuación']
    },
    {
      name: 'Agente Seguimiento',
      mission: 'Acompañar la ejecución y asegurar que las acciones se desarrollen con continuidad.',
      outputs: ['Seguimiento', 'Alertas', 'Recomendaciones']
    }
  ],
  inputs: [
    'Noticias',
    'BOE',
    'DOGV',
    'Agenda cultural',
    'Ferias',
    'Fiestas patronales'
  ],
  process: [
    'Clasifica',
    'Resume',
    'Relaciona con proyectos'
  ],
  outputs: [
    'Informe diario',
    'Alertas',
    'Propuestas'
  ]
};
