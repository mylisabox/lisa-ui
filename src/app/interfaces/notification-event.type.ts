import {Notification} from "../models/notification.type";

export interface NotificationEvent {
  command: string;
  id?: string;
  notification?: Notification;
}
