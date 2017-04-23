import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {SpeechService} from "../../services/speech.service";

@Component({
  selector: 'lisa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed: boolean = true;
  public isNotificationCollapsed: boolean = true;

  constructor(private _authService: AuthService,
              public _speechService: SpeechService) {
  }

  ngOnInit() {
  }

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  public toggleSpeech() {
    if (this._speechService.isListening) {
      this._speechService.stop()
    }
    else {
      this._speechService.start()
    }
  }

  logout() {
    this._authService.logout();
  }

}
