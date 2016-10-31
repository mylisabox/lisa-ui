import {Injectable} from '@angular/core';
import {WebsocketService} from '../interfaces/websocket-service';
import {NotificationService} from "./notification.service";
import {AuthService} from "./auth.service";

@Injectable()
export class WebsocketFrontService {

  constructor(private notificationService: NotificationService, private authService: AuthService) {
  }

  init() {
    //
    // Tell primus to create a new connect to the current domain/port/protocol
    //
    const primus = Primus.connect(`ws://localhost:3000?token=${this.authService.getToken()}`);
    console.log('primus init')
    primus.on('connexion', data => {
      console.log('connexion', data)
    });

    primus.on('disconnect', data => {
      console.log('disconnect', data)
    });

    primus.on('create', data => {
      console.log('create', data)
    });
    primus.on('update', data => {
      console.log('update', data)
    });
    primus.on('destroy', data => {
      console.log('destroy', data)
    });
    primus.on('notification', data => {
      this.notificationService.manageNotification(data)
      console.log('notification', data)
    });

    primus.join('notification');
  }

}

export const BROWSER_WEBSOCKET_PROVIDERS = [
  WebsocketFrontService,
  WebsocketService,
  {provide: WebsocketService, useClass: WebsocketFrontService}
];
