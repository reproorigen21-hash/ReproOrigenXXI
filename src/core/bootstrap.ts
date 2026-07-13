import { InMemoryAgentRegistry } from './AgentRegistry';
import { InMemoryAuditEngine } from './AuditEngine';
import { ReproDirectorIA } from './DirectorIA';
import { InMemoryEventBus } from './EventBus';
import { InMemoryKnowledgeBase } from './KnowledgeBase';
import { InMemoryMemoryEngine } from './MemoryEngine';
import { InMemoryNotificationEngine } from './NotificationEngine';
import { ReproPermissionEngine } from './PermissionEngine';
import { ReproPromptEngine } from './PromptEngine';
import { InMemoryTaskQueue } from './TaskQueue';
import { AI_STANDARD } from './AI_STANDARD';
import { builtinAgents } from '@/agents/builtin-agents';

export const reproosCore = {
  registry: new InMemoryAgentRegistry(),
  knowledgeBase: new InMemoryKnowledgeBase(),
  taskQueue: new InMemoryTaskQueue(),
  memory: new InMemoryMemoryEngine(),
  events: new InMemoryEventBus(),
  permissions: new ReproPermissionEngine(),
  notifications: new InMemoryNotificationEngine(),
  audits: new InMemoryAuditEngine(),
  prompts: new ReproPromptEngine()
};

builtinAgents.forEach((agent) => reproosCore.registry.register(agent));

reproosCore.knowledgeBase.upsert({
  id: 'vision',
  title: 'Vision ReproOrigen XXI',
  section: 'Base',
  content: 'Plataforma de agentes especializados para empresas, administraciones y organizaciones.',
  tags: ['vision', 'plataforma', 'agentes']
});

reproosCore.knowledgeBase.upsert({
  id: 'standard',
  title: 'AI Standard',
  section: 'Agentes',
  content: 'Norma unica para construir agentes con seguridad, memoria, limites e integraciones.',
  tags: ['standard', 'seguridad', 'agentes']
});

reproosCore.knowledgeBase.upsert({
  id: 'director',
  title: 'Director IA',
  section: 'Orquestacion',
  content: 'Cerebro central encargado de enrutar, priorizar y registrar el sistema operativo de agentes.',
  tags: ['director ia', 'orquestacion', 'router']
});

export const directorIA = new ReproDirectorIA(
  reproosCore.registry,
  reproosCore.taskQueue,
  reproosCore.memory,
  reproosCore.events,
  AI_STANDARD
);
