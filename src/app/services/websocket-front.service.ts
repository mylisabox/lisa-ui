import {Injectable} from "@angular/core";
import {WebsocketService} from "../interfaces/websocket-service";
import {NotificationService} from "./notification.service";
import {AuthService} from "./auth.service";
import {Globals} from "../common/globals";
import {Subject} from "rxjs";
import {WebsocketEvent} from "../interfaces/websocket-event.type";

@Injectable()
export class WebsocketFrontService {
  private _emitter: Subject<WebsocketEvent> = new Subject<WebsocketEvent>();

  constructor(private _notificationService: NotificationService, private _authService: AuthService) {
  }

  getEmitter(): Subject<WebsocketEvent> {
    return this._emitter;
  }

  init() {
    //
    // Tell primus to create a new connect to the current domain/port/protocol
    //
    const primus = Primus.connect(`${Globals.getWsUrl('')}?token=${this._authService.getToken()}`);
    console.log('primus init')
    primus.on('initialised', data => {
      console.log('initialised', data)
    });

    primus.on('connexion', data => {
      console.log('connexion', data)
    });

    primus.on('disconnect', data => {
      console.log('disconnect', data)
    });

    primus.on('create', (model, data) => {
      console.log('create', model, data);
      this._emitter.next({command: 'create', type: model, item: data, id: data.id});
    });

    primus.on('update', (model, data) => {
      console.log('update', data);
      this._emitter.next({command: 'update', type: model, item: data, id: data.id});
    });

    primus.on('destroy', (model, data) => {
      console.log('destroy', data);
      this._emitter.next({command: 'destroy', type: model, item: data, id: data.id});
    });

    primus.on('notification', data => {
      this._notificationService.manageNotification(data)
      console.log('notification', data)
    });

    primus.on('error', data => {
      console.log(data);
      debugger;
    });

    primus.join('room');
    primus.join('device');
    primus.join('notification');
  }

}

export const BROWSER_WEBSOCKET_PROVIDERS = [
  WebsocketFrontService,
  WebsocketService,
  {provide: WebsocketService, useClass: WebsocketFrontService}
];
