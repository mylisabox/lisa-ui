import {Injectable}    from '@angular/core';

@Injectable()
export class NotificationService {
  manageNotification(notification: any) {
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
          console.log('TODO');
        };
      } else if (window.Notification.permission === "default") {
        window.Notification.requestPermission(() => this.manageNotification(notification));
      } else {
        // TODO setup an html notification
      }
    } else if (window.webkitNotifications) {
      if (window.webkitNotifications.checkPermission() === 0) {
        const desktopNotification = window.webkitNotifications.createNotification(
          '/images/logo.png',
          notification.title || 'L.I.S.A.', notification.description || 'new notification');
        desktopNotification.nativeNotification = notification;
        /*desktopNotification.ondisplay = function () {
         };
         desktopNotification.onclose = function () {
         };*/
        desktopNotification.onclick = function () {
          desktopNotification.hide();
          console.log('TODO');
        };
        desktopNotification.show();
      } else if (window.webkitNotifications.checkPermission() === 1) {
        window.webkitNotifications.requestPermission(() => this.manageNotification(notification));
      } else {
        // TODO setup an html notification
      }
    }
  }
}
