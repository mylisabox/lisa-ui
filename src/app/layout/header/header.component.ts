import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {SpeechService} from "../../services/speech.service";

@Component({
  selector: 'lisa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SpeechService]
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed: boolean = true;
  public isNotificationCollapsed: boolean = true;
  isSpeechAvailable: boolean = false;

  constructor(private _authService: AuthService,
              public _speechService: SpeechService) {
    this.isSpeechAvailable = this._speechService.isAvailable()
    this._speechService.init(event => {
      const last = event.results.length - 1;
      const result = event.results[last];
      if (result.isFinal) {
        const sentence = event.results[last][0].transcript;
        this._speechService.sendVoiceCommand(sentence).subscribe(
          data => console.log(data),
          error => console.log(error)
        );
      }
    });
  }

  ngOnInit() {
  }

  public collapsed(event: any): void {

  }

  public expanded(event: any): void {

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
