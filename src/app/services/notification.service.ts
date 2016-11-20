import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {NotificationEvent} from "../interfaces/notification-event.type";

@Injectable()
export class NotificationService {
  private emitter: Subject<NotificationEvent> = new Subject<NotificationEvent>();

  constructor(private router: Router) {
  }

  getChangeEmitter() {
    return this.emitter;
  }

  private _manageDesktopNotification(notification: any) {
    if (window.Notification) {
      if (window.Notification.permission === "granted") {
        const notify = new window.Notification(notification.title || 'L.I.S.A.',
          {
            icon: '/images/logo.png',
            body: notification.description || 'new notification',
            tag: notification.id
          });
        notify.onclick = () => {
          notify.close();
          this._onDesktopNotificationClicked(notification)
        };
      } else if (window.Notification.permission === "default") {
        window.Notification.requestPermission(() => this._manageDesktopNotification(notification));
      } else {
        this._showHTMLNotification(notification)
      }
    }
    else {
      this._showHTMLNotification(notification)
    }
  }

  manageNotification(notification: any) {
    if (notification.defaultAction || notification.addAction) {
      this._manageDesktopNotification({
        title: 'New notification',
        description: 'Click to see the new notification'
      });
      this._showHTMLNotification(notification);
    }
    else {
      this._manageDesktopNotification(notification);
      this._showHTMLNotification(notification);
      /*else if (window.webkitNotifications) {
       if (window.webkitNotifications.checkPermission() === 0) {
       const desktopNotification = window.webkitNotifications.createNotification(
       '/images/logo.png',
       notification.title || 'L.I.S.A.', notification.description || 'new notification');
       desktopNotification.nativeNotification = notification;

       desktopNotification.onclick = function () {
       desktopNotification.hide();
       this._onDesktopNotificationClicked(notification)
       };
       desktopNotification.show();
       } else if (window.webkitNotifications.checkPermission() === 1) {
       window.webkitNotifications.requestPermission(() => this.manageNotification(notification));
       } else {
       this._showHTMLNotification(notification)
       }
       }*/
    }
  }

  private _showHTMLNotification(notification: any) {
    if (notification.id) {
      this.emitter.next({command: 'set', notification: notification});
    }
  }

  private _onDesktopNotificationClicked(notification: any) {
    this.router.navigate(['/notifications']);
  }
}
