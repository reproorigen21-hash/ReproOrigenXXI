import type { AgentRegistry } from './AgentRegistry';
import type { EventBus } from './EventBus';
import type { MemoryEngine } from './MemoryEngine';
import type { TaskQueue } from './TaskQueue';
import type { AIStandard, AgentTask } from './types';

export interface DirectorIA {
  registerAgent(agentId: string): void;
  activateAgent(agentId: string): void;
  deactivateAgent(agentId: string): void;
  sendTask<TPayload>(agentId: string, task: Omit<AgentTask<TPayload>, 'createdAt' | 'updatedAt' | 'status' | 'logs'>): AgentTask<TPayload>;
  prioritizeTask(taskId: string, priority: number): void;
  waitForResponse(taskId: string, note: string): void;
  combineResponses<T>(responses: T[]): T;
  recordMemory(entry: Parameters<MemoryEngine['remember']>[0]): void;
  audit(action: string, target: string, status?: 'ok' | 'warning' | 'error'): void;
}

export class ReproDirectorIA implements DirectorIA {
  constructor(
    private readonly registry: AgentRegistry,
    private readonly queue: TaskQueue,
    private readonly memory: MemoryEngine,
    private readonly events: EventBus,
    private readonly standard: AIStandard
  ) {}

  registerAgent(agentId: string) {
    this.events.publish({ type: 'agent.registered', source: 'DirectorIA', payload: { agentId } });
  }

  activateAgent(agentId: string) {
    this.registry.activate(agentId);
    this.events.publish({ type: 'agent.activated', source: 'DirectorIA', payload: { agentId } });
  }

  deactivateAgent(agentId: string) {
    this.registry.deactivate(agentId);
    this.events.publish({ type: 'agent.deactivated', source: 'DirectorIA', payload: { agentId } });
  }

  sendTask<TPayload>(agentId: string, task: Omit<AgentTask<TPayload>, 'createdAt' | 'updatedAt' | 'status' | 'logs'>) {
    const queued = this.queue.enqueue({ ...task, agent: agentId });
    this.events.publish({ type: 'task.sent', source: 'DirectorIA', payload: { agentId, taskId: queued.id } });
    return queued;
  }

  prioritizeTask(taskId: string, priority: number) {
    this.queue.prioritize(taskId, priority);
    this.events.publish({ type: 'task.prioritized', source: 'DirectorIA', payload: { taskId, priority } });
  }

  waitForResponse(taskId: string, note: string) {
    this.queue.wait(taskId, note);
    this.events.publish({ type: 'task.waiting', source: 'DirectorIA', payload: { taskId, note } });
  }

  combineResponses<T>(responses: T[]) {
    return responses[responses.length - 1] ?? ({} as T);
  }

  recordMemory(entry: Parameters<MemoryEngine['remember']>[0]) {
    this.memory.remember(entry);
    this.events.publish({ type: 'memory.recorded', source: 'DirectorIA', payload: entry });
  }

  audit(action: string, target: string, status: 'ok' | 'warning' | 'error' = 'ok') {
    this.events.publish({ type: 'audit.logged', source: 'DirectorIA', payload: { action, target, status, standard: this.standard.identity } });
  }
}
