import type { FunctionalAgentKey } from '@/data/functional-agents';

export interface BaseAgent {
  id: string;
  name: string;
  description: string;
  execute(task: unknown): Promise<unknown>;
  validate(): boolean;
  remember(note: string): void;
  log(message: string): void;
}

export type RegisteredAgent = BaseAgent & {
  status: 'active' | 'inactive' | 'pilot';
  version: string;
};

export interface AgentRegistry {
  register(agent: RegisteredAgent): void;
  activate(agentId: string): void;
  deactivate(agentId: string): void;
  get(agentId: string): RegisteredAgent | undefined;
  list(): RegisteredAgent[];
  getByDomain(domain: FunctionalAgentKey | string): RegisteredAgent[];
}

export class InMemoryAgentRegistry implements AgentRegistry {
  private agents = new Map<string, RegisteredAgent>();

  register(agent: RegisteredAgent) {
    this.agents.set(agent.id, agent);
  }

  activate(agentId: string) {
    const agent = this.agents.get(agentId);
    if (agent) agent.status = 'active';
  }

  deactivate(agentId: string) {
    const agent = this.agents.get(agentId);
    if (agent) agent.status = 'inactive';
  }

  get(agentId: string) {
    return this.agents.get(agentId);
  }

  list() {
    return [...this.agents.values()];
  }

  getByDomain(domain: FunctionalAgentKey | string) {
    return this.list().filter((agent) => agent.name.toLowerCase().includes(domain.toString().toLowerCase()) || agent.description.toLowerCase().includes(domain.toString().toLowerCase()));
  }
}
