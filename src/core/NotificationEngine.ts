import type { NotificationEntry } from './types';

export interface NotificationEngine {
  notify(notification: Omit<NotificationEntry, 'id' | 'createdAt' | 'read'>): NotificationEntry;
  list(): NotificationEntry[];
  markAsRead(notificationId: string): NotificationEntry | undefined;
}

export class InMemoryNotificationEngine implements NotificationEngine {
  private notifications: NotificationEntry[] = [];

  notify(notification: Omit<NotificationEntry, 'id' | 'createdAt' | 'read'>) {
    const entry: NotificationEntry = {
      ...notification,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      read: false
    };

    this.notifications.unshift(entry);
    return entry;
  }

  list() {
    return [...this.notifications];
  }

  markAsRead(notificationId: string) {
    const notification = this.notifications.find((item) => item.id === notificationId);
    if (notification) notification.read = true;
    return notification;
  }
}
