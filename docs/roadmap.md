# Roadmap de ReproOrigen XXI

## Objetivo general

Construir una plataforma modular y escalable que vaya más allá de una web tradicional.
El enfoque es mantener un núcleo de estado global, un layout central (`OS_Shell`) y flujos de experiencia bien definidos para permitir futuras integraciones con CRM, correo, IA y persistencia de datos.

## Fases principales

### 1. Consolidación de la plataforma base

- Definir `OS_Shell` como layout principal.
- Mantener fuera de `OS_Shell` las pantallas de entrada:
  - `IntroScreen`
  - `ActivateExperience`
- Construir `OSContext` como estado global único.
- Desarrollar `ExploreSystem` para activar módulos, tipo de usuario e interés.
- Garantizar que los formularios consuman contexto global automáticamente.

### 2. Módulos funcionales iniciales

- Crear los módulos base del hub:
  - Empresas
  - Hogar
  - Territorio
  - Formación
  - Comunidad
- Diseñar experiencias básicas para cada módulo.
- Visualizar el estado del módulo activo en `OSShell`.
- Conectar los módulos con la lógica de `ExploreSystem`.

### 3. Captación y seguimiento

- Implementar formularios inteligentes que incluyan contexto global:
  - `ContactForm`
  - `LeadCaptureForm`
- Extender `useLeadContext()` para nuevos formularios de conversión.
- Definir payloads de envío estándar con:
  - módulo activo
  - tipo de usuario
  - interés
  - origen

### 4. Servicios internos y APIs

- Crear la capa de `Motor de Servicios` para:
  - CRM
  - Email
  - IA
  - Base de datos
- Separar los adaptadores de servicio en `src/services/`.
- Garantizar que los formularios y experiencias puedan enviar datos al motor de servicios.

### 5. Panel de administración

- Diseñar un panel de administración para:
  - supervisar leads
  - rastrear conversiones
  - gestionar módulos y contenidos
  - consultar la telemetría del estado global
- Conectar el panel con el `Motor de Servicios` y con el estado de plataforma.

### 6. Escalabilidad y crecimiento

- Mantener componentes pequeños y reutilizables.
- Añadir nuevos módulos sin cambiar la infraestructura central.
- Crear hooks y contextos adicionales según sea necesario.
- Documentar cada nuevo flujo con claridad en `docs/`.

## Prioridades a corto plazo

1. Validar el flujo Intro → Activate → Platform con `OS_Shell`.
2. Asegurar que `ExploreSystem` actualice `OSContext` correctamente.
3. Hacer que los formularios utilicen contexto global de manera transparente.
4. Agregar servicios básicos de captura de datos.

## Prioridades a mediano plazo

1. Añadir un primer servicio real de CRM o email.
2. Evaluar la persistencia de datos en un backend o base de datos.
3. Construir un panel de administración inicial.
4. Crear un estilo visual consistente para el hub y las experiencias.

## Prioridades a largo plazo

1. Integrar IA para recomendaciones y generación de contenido.
2. Extender el hub con más módulos y flujos de experiencia.
3. Escalar la plataforma para múltiples tipos de usuario y verticales.
4. Establecer un proceso de evolución continua sin rehacer la base existente.

## Guía para nuevos desarrolladores

- Comienza por leer `docs/architecture.md`.
- Revisa `src/context/OSContext.tsx` para entender el estado global.
- Examina `src/components/ExploreSystem.tsx` y `src/hooks/useLeadContext.ts`.
- Añade nuevos módulos siguiendo el patrón de estado global y de `OS_Shell`.
- Usa `docs/roadmap.md` para orientar el crecimiento incremental del proyecto.
