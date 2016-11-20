import {WebsocketEvent} from "./websocket-event.type";
import {Subject} from "rxjs";
export class WebsocketService {
  init() {
    console.log('WebsocketService')
  }

  getEmitter(): Subject<WebsocketEvent> {
    return null;
  }
}
