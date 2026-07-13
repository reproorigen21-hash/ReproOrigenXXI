import type { AgentTask, TaskStatus } from './types';

export interface TaskQueue {
  enqueue<TPayload>(task: Omit<AgentTask<TPayload>, 'createdAt' | 'updatedAt' | 'status' | 'logs'> & { status?: TaskStatus }): AgentTask<TPayload>;
  start(taskId: string): AgentTask | undefined;
  wait(taskId: string, log: string): AgentTask | undefined;
  complete<TResult>(taskId: string, result: TResult): AgentTask<TResult> | undefined;
  fail(taskId: string, error: string): AgentTask | undefined;
  cancel(taskId: string, reason?: string): AgentTask | undefined;
  prioritize(taskId: string, priority: number): AgentTask | undefined;
  list(): AgentTask[];
}

export class InMemoryTaskQueue implements TaskQueue {
  private tasks: AgentTask[] = [];

  enqueue<TPayload>(task: Omit<AgentTask<TPayload>, 'createdAt' | 'updatedAt' | 'status' | 'logs'> & { status?: TaskStatus }): AgentTask<TPayload> {
    const now = new Date().toISOString();
    const entry: AgentTask<TPayload> = {
      ...task,
      createdAt: now,
      updatedAt: now,
      status: task.status ?? 'PENDING',
      logs: []
    };

    this.tasks.unshift(entry);
    this.sort();
    return entry;
  }

  start(taskId: string) {
    return this.mutate(taskId, (task) => ({ ...task, status: 'RUNNING', logs: [...task.logs, 'Task started'] }));
  }

  wait(taskId: string, log: string) {
    return this.mutate(taskId, (task) => ({ ...task, status: 'WAITING', logs: [...task.logs, log] }));
  }

  complete<TResult>(taskId: string, result: TResult) {
    return this.mutate(taskId, (task) => ({ ...task, status: 'COMPLETED', result, logs: [...task.logs, 'Task completed'] })) as AgentTask<TResult> | undefined;
  }

  fail(taskId: string, error: string) {
    return this.mutate(taskId, (task) => ({ ...task, status: 'FAILED', logs: [...task.logs, `Task failed: ${error}`] }));
  }

  cancel(taskId: string, reason = 'Cancelled by system') {
    return this.mutate(taskId, (task) => ({ ...task, status: 'CANCELLED', logs: [...task.logs, reason] }));
  }

  prioritize(taskId: string, priority: number) {
    const task = this.find(taskId);
    if (!task) return undefined;
    task.priority = priority;
    task.updatedAt = new Date().toISOString();
    this.sort();
    return task;
  }

  list() {
    return [...this.tasks];
  }

  private find(taskId: string) {
    return this.tasks.find((task) => task.id === taskId);
  }

  private mutate(taskId: string, updater: (task: AgentTask) => AgentTask) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index === -1) return undefined;

    const current = this.tasks[index];
    const updated = updater(current);
    updated.updatedAt = new Date().toISOString();
    this.tasks[index] = updated;
    this.sort();
    return updated;
  }

  private sort() {
    this.tasks.sort((left, right) => right.priority - left.priority || new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime());
  }
}
