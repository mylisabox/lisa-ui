import {Component} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {WebsocketService} from "../../../interfaces/websocket-service";

@Component({
  selector: 'lisa-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent {
  error: string;

  constructor(private router: Router, private authService: AuthService, private websocketService: WebsocketService) {

  }

  login(event, identifier, password) {
    event.preventDefault();
    this.error = null;
    this.authService.login(identifier, password).subscribe(
      response => {
        this.authService.setToken(response.json().token);
        this.websocketService.init();
        this.router.navigate(['/home']);
      },
      error => {
        switch (error.status) {
          case 0:
            this.error = 'No server listening, please launch the server and then try to log in';
            break;
          case 401:
            this.error = 'Email or password incorrect, please verify your information and then try to log in';
            break;
          default:
            this.error = 'An error occurred, please try again later';
        }
      }
    );
  }
}
