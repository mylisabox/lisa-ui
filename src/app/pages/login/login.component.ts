import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'lisa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthService) {
  }

  ngOnInit() {
    if (this._authService.isConnected()) {
      this._router.navigate(['/home']);
    }
  }

}
