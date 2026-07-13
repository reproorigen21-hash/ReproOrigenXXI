import type { AgentRole } from './types';

export interface PermissionEngine {
  can(role: AgentRole, action: string): boolean;
}

const roleMatrix: Record<AgentRole, string[]> = {
  SuperAdmin: ['*'],
  Admin: ['read', 'write', 'execute', 'manage'],
  Manager: ['read', 'write', 'execute'],
  Employee: ['read', 'write'],
  Guest: ['read']
};

export class ReproPermissionEngine implements PermissionEngine {
  can(role: AgentRole, action: string) {
    return roleMatrix[role].includes('*') || roleMatrix[role].includes(action);
  }
}
