import {Injectable} from "@angular/core";
import {WebsocketService} from "../interfaces/websocket-service";
import {Subject} from "rxjs";
import {WebsocketEvent} from "../interfaces/websocket-event.type";

@Injectable()
export class WebsocketBackService implements WebsocketService {
  getEmitter(): Subject<WebsocketEvent> {
    return undefined;
  }

  constructor() {
  }

  init() {

  }

}
