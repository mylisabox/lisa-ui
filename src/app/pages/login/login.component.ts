import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'lisa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mode: string = 'login';
  pending: boolean = false;

  constructor(private _router: Router, private _authService: AuthService) {

  }

  ngOnInit() {
    if (this._authService.isConnected()) {
      this._router.navigate(['/home']);
    }
    else {
      this.pending = true;
      this._authService.isInitialized().subscribe((response: any) => {
          this.pending = false;
          if (!response.json().initialized) {
            this.mode = 'register';
          }
        },
        err => {
          this.pending = false;
        });
    }
  }

}
