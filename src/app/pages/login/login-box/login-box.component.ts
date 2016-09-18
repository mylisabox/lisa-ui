import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Globals} from "../../../common/globals";

@Component({
  selector: 'lisa-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  login(event, identifier, password) {
    event.preventDefault();
    this.authService.login(identifier, password).subscribe(
      response => {
        localStorage.setItem(Globals.tokenKey, response.json().token);
        console.log(response.json());
        this.router.navigate(['/home']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
