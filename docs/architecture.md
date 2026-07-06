# Arquitectura de ReproOrigen XXI

## Visión general

ReproOrigen XXI no es una web estática; es una plataforma modular pensada para crecer durante años.
La arquitectura se basa en un núcleo de estado global compartido y un layout principal (`OS_Shell`) que envuelve a los módulos activos.

## Principios clave

1. `OS_Shell` es el layout principal de la plataforma.
   - Está presente en todas las pantallas de la plataforma salvo las excepciones aprobadas:
     - `IntroScreen` (introducción cinematográfica)
     - `ActivateExperience` (pantalla de activación)
   - Cualquier pantalla posterior a la activación se ejecuta dentro de `OS_Shell`.

2. El estado global se mantiene en `OSContext`.
   - Estado disponible en toda la plataforma mediante el hook `useOS()`.
   - Campos principales:
     - `screen`: pantalla actual (`intro`, `activate`, `platform`)
     - `activeModule`: módulo seleccionado
     - `userType`: tipo de usuario
     - `interest`: interés principal del usuario
     - `origin`: origen de la navegación o interacción

3. `ExploreSystem` actualiza el estado global.
   - Cada vez que el usuario selecciona un módulo, el estado global se actualiza con el módulo activo.
   - El tipo de usuario y el interés también se actualizan desde `ExploreSystem`.
   - El origen de la navegación se conserva y se puede actualizar según el flujo actual.

4. Los formularios de contacto y lead capturan automáticamente el contexto global.
   - Los formularios no necesitan pedir al usuario repetir el módulo, el tipo de usuario ni el interés.
   - El hook `useLeadContext()` encapsula la extracción de ese contexto para cualquier formulario futuro.
   - El contexto se incluye como campos ocultos y en el payload de envío.

## Estructura modular

La plataforma está organizada en capas claras:

- `src/context/OSContext.tsx`
  - Proveedor global de estado de plataforma.
- `src/components/OSShell.tsx`
  - Layout principal que envuelve la experiencia productiva.
- `src/components/ExploreSystem.tsx`
  - Módulo de selección y orquestador de estado global.
- `src/components/ModuleHub.tsx`
  - Área principal de trabajo con formularios y contenidos del módulo.
- `src/hooks/useLeadContext.ts`
  - Hook reutilizable para extraer contexto global en formularios.
- `src/components/ContactForm.tsx` y `src/components/LeadCaptureForm.tsx`
  - Formularios que consumen el estado global automáticamente.

## Flujo de navegación

1. El usuario llega a `IntroScreen`.
2. Navega a `ActivateExperience`.
3. Al entrar a la plataforma, `OS_Shell` se activa.
4. El usuario interactúa con `ExploreSystem`.
5. `ExploreSystem` actualiza `OSContext` con el módulo activo, tipo de usuario, interés y origen.
6. Los formularios capturan ese contexto sin entrada adicional del usuario.

## Patrones para escalar

- Mantener `OSContext` como única fuente de verdad para el estado global.
- Añadir nuevos módulos respetando el mismo contrato de `activeModule` y `origin`.
- Reutilizar `useLeadContext()` o crear hooks similares para otros flujos de captura.
- Separar lógica de presentación de la lógica de negocio:
  - Componentes enfocados en UI.
  - Contextos y hooks enfocados en estado y datos.

## Preparación para integraciones futuras

La plataforma está preparada para integrar en el futuro:

- CRM
  - Añadir un servicio `src/services/crmService.ts` que reciba el payload global.
- Base de datos
  - Crear adaptadores que tomen los datos de `OSContext` y los persistan en el backend.
- Correo
  - Añadir un servicio de email que use el contexto global para personalizar envíos.
- IA
  - Construir servicios de IA que consulten el estado global para generar respuestas, recomendaciones o contenidos.

## Notas finales

ReproOrigen XXI debe mantenerse como una plataforma evolutiva.
Evitar código monolítico y preferir componentes pequeños, contextos reutilizables y hooks específicos.
Cada nueva funcionalidad debe integrarse como un módulo escalable sin rehacer lo existente.

## Diagrama de arquitectura

```text
                    INTRO
                      │
                      ▼
              EXPLORAR ECOSISTEMA
                      │
 ┌────────────────────┼────────────────────┐
 │                    │                    │
 ▼                    ▼                    ▼
EMPRESAS           HOGAR             TERRITORIO
 │                    │                    │
 └──────────────┬─────┴──────────────┬─────┘
                ▼                    ▼
        OBSERVATORIO          CAMPUS UNIVERSITY
                │
                ▼
        CONSEJO DE AGENTES IA
                │
                ▼
      CRM · PROYECTOS · DOCUMENTOS
                │
                ▼
      IMPACTO · INDICADORES · MEMORIA
```

### Explicación de niveles

* **Presentación (Experiencia).** La primera capa corresponde a la introducción y la activación de la experiencia. Es la entrada al ecosistema y está fuera de `OS_Shell`.
* **Exploración (Hub).** `ExploreSystem` actúa como el sello central y el hub de selección. Aquí se define el módulo activo, el tipo de usuario, el interés y el origen.
* **Módulos funcionales.** Bloques como `Empresas`, `Hogar`, `Territorio`, `Formación` y `Comunidad` representan las áreas del producto que se activan desde el hub.
* **Captación de oportunidades.** `Experiencias` y `Formularios Inteligentes` son el puente entre la exploración y la conversión. Recogen el contexto global automáticamente.
* **Servicios internos.** El `Motor de Servicios` orquesta integraciones centrales: CRM, correo, IA y base de datos. Sirve como backend interno de la plataforma.
* **Administración.** El `Panel de Administración` cierra el flujo y permite operar la plataforma, supervisar datos y gestionar oportunidades.
