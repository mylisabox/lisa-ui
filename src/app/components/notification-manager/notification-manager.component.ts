import {Component, OnInit, OnDestroy} from "@angular/core";
import {NotificationService} from "../../services/notification.service";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Notification} from "../../models/notification.type";
import {defaultIcons} from "../../common/icons";

@Component({
  selector: 'lisa-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent implements OnInit, OnDestroy {
  private listener: Subscription;
  public notifications: Array<Notification> = [];
  public safeHTML: SafeHtml;

  constructor(private domSanitizer: DomSanitizer, private service: NotificationService) {
  }

  ngOnInit() {
    // Listen for changes in the service
    this.listener = this.service.getChangeEmitter()
      .subscribe(item => {
        switch (item.command) {
          case 'cleanAll':
            this.notifications = [];
            break;

          case 'clean':
            this.cleanSingle(item.id);
            break;

          case 'set':
            this.replaceIfExist(item.notification);
            break;

          default:
            this.replaceIfExist(item.notification);
            break;
        }
      });
  }

  private cleanSingle(id: string): void {
    let indexOfDelete: number = 0;
    let doDelete: boolean = false;

    this.notifications.forEach((notification, idx) => {
      if (notification.id === id) {
        indexOfDelete = idx;
        doDelete = true;
      }
    });

    if (doDelete) {
      this.notifications.splice(indexOfDelete, 1);
    }
  }

  private replaceIfExist(notification: Notification) {
    this.safeHTML = this.domSanitizer.bypassSecurityTrustHtml(defaultIcons[notification.icon] || defaultIcons.info)
    const index = this.notifications.indexOf(notification);
    if (index === -1) {
      this.notifications.push(notification);
    }
    else {
      this.notifications.splice(index, 1);
    }

    console.log('notifs', this.notifications);
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener.unsubscribe();
    }
  }

}
