import {Notification} from './notification.type';

export interface NotificationEvent {
  command: string;
  id?: string;
  notification?: Notification;
}
