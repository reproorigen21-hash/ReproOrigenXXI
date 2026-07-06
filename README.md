# ReproOrigen XXI

Plataforma modular enfocada en conectar personas, empresas y territorio, transformando oportunidades en proyectos reales.

## Visión

ReproOrigen XXI es una plataforma modular diseñada para conectar personas, empresas y territorio, transformando oportunidades en proyectos reales.

## Arquitectura

La arquitectura técnica está documentada en:

[docs/architecture.md](docs/architecture.md)

## Hoja de ruta

El estado del proyecto y las próximas fases se documentan en:

[docs/roadmap.md](docs/roadmap.md)

## Tecnologías

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion

## Estado del proyecto

Primera arquitectura modular en desarrollo. A partir de este momento, la arquitectura base está congelada y el trabajo se centrará en construir funcionalidades y experiencia sobre esta base.

## Fase 5 — Panel del instalador

Cada profesional tendrá acceso a un panel para:

- aceptar trabajos
- subir fotos
- marcar la obra como terminada
- emitir documentación

## Fase 6 — Panel Empresa

Desde el panel de empresa se podrá supervisar:

- obras abiertas
- técnicos disponibles
- presupuestos
- incidencias
- pagos pendientes
- clientes

## Espacio Climatización

• Aire acondicionado

• Aerotermia

• Bombas de calor

• Conductos

• Mantenimiento

• Eficiencia energética

• Subvenciones

## Flujo IA: Oportunidad Cruzada

Cliente

↓

Necesita ventanas

↓

¿Puede beneficiarse de aerotermia?

↓

¿Necesita aire acondicionado?

↓

¿Puede solicitar ayudas?

↓

Se crean automáticamente oportunidades comerciales.

## Estructura Operativa

```text
REPROORIGEN XXI

                      │
     ─────────────────┼─────────────────
                      │
            CENTRO DE OPERACIONES
                      │
──────────────────────┼──────────────────────

🏠 Hogar
│
├── Ventanas PVC
├── Climatización
├── Aerotermia
├── Aislamiento
├── Energía Solar
├── Reformas
└── Subvenciones

🏢 Empresas
│
├── Automatización
├── IA
├── CRM
└── Consultoría

🌍 Territorio
│
├── Ayuntamientos
├── Turismo
├── Repoblación
└── Medio ambiente
```

## Campos Base de Registro

- id
- nombre
- telefono
- email
- direccion
- tipo
- estado

## Campos Perfil Profesional

- id
- nombre
- especialidad
- provincia
- disponibilidad
- valoracion

## Campos de Obra e Instalación

- id
- cliente
- direccion
- estado
- fecha
- instalador

## Campos de Presupuesto

- id
- cliente
- importe
- estado
- pdf

## Campos de Documento

- id
- titulo
- fecha
- usuario
- obra
