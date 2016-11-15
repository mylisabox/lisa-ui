import {WebsocketEvent} from "../models/websocket-event.type";
import {Subject} from "rxjs";
export class WebsocketService {
  init() {
    console.log('WebsocketService')
  }

  getEmitter(): Subject<WebsocketEvent> {
    return null;
  }
}
