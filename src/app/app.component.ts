import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "./interfaces/websocket-service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'lisa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private websocketService: WebsocketService, private authService: AuthService) {

  }

  ngOnInit() {
    if (this.authService.isConnected()) {
      this.websocketService.init();
    }
  }
}
