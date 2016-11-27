import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {WebsocketService} from "./interfaces/websocket-service";
import {AuthService} from "./services/auth.service";
import {SpeechService} from "./services/speech.service";

@Component({
  selector: 'lisa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _viewContainerRef: ViewContainerRef,
              private _speechService: SpeechService,
              private _websocketService: WebsocketService,
              private _authService: AuthService) {
  }

  ngOnInit() {
    if (this._authService.isConnected()) {
      this._websocketService.init();
    }
    this._speechService.init();
  }
}
