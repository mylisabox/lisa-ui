import {Component} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Globals} from "../../../common/globals";
import {WebsocketService} from "../../../interfaces/websocket-service";

@Component({
  selector: 'lisa-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent {

  constructor(private router: Router, private authService: AuthService, private websocketService: WebsocketService) {
  }

  login(event, identifier, password) {
    event.preventDefault();
    this.authService.login(identifier, password).subscribe(
      response => {
        localStorage.setItem(Globals.tokenKey, response.json().token);
        this.websocketService.init();
        this.router.navigate(['/home']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
