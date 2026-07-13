export type TaskStatus = 'PENDING' | 'RUNNING' | 'WAITING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type AgentRole = 'SuperAdmin' | 'Admin' | 'Manager' | 'Employee' | 'Guest';

export type CoreIdentity = {
  product: 'ReproOrigen XXI';
  platform: 'ReproOS';
  mission: string;
};

export type CoreValues = string[];

export type CoreTone = {
  voice: string;
  style: string;
  principles: string[];
};

export type AIStandard = {
  identity: CoreIdentity;
  values: CoreValues;
  tone: CoreTone;
  protocols: string[];
  security: string[];
  responseFormat: string[];
};

export type AgentTask<TPayload = unknown> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  priority: number;
  status: TaskStatus;
  agent: string;
  payload: TPayload;
  result?: unknown;
  logs: string[];
};

export type MemoryEntry = {
  id: string;
  user: string;
  organization: string;
  project: string;
  agent: string;
  date: string;
  action: string;
  result: string;
  tokens: number;
  cost: number;
  durationMs: number;
};

export type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
  status: 'ok' | 'warning' | 'error';
  details?: string;
};

export type NotificationEntry = {
  id: string;
  title: string;
  message: string;
  audience: AgentRole | 'system';
  createdAt: string;
  read: boolean;
};

export type EventEntry = {
  id: string;
  type: string;
  source: string;
  createdAt: string;
  payload: unknown;
};
