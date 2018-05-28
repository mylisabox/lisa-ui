import {Component} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {WebsocketService} from "../../../interfaces/websocket-service";

@Component({
  selector: 'lisa-register-box',
  templateUrl: './register-box.component.html',
  styleUrls: ['./register-box.component.scss']
})
export class RegisterBoxComponent {
  error: string;

  constructor(private router: Router, private authService: AuthService, private websocketService: WebsocketService) {
  }

  register(event, identifier, password) {
    event.preventDefault();
    this.error = null;
    this.authService.register(identifier, password).subscribe(
      () => {
        this.websocketService.init();
        return this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 0) {
          this.error = 'No server listening, please launch the server and then try to log in';
        }
        else {
          this.error = 'An error occurred, please try again later';
        }
      }
    );
  }

}
