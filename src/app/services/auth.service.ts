import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {contentHeaders} from "../common/headers";
import {Http} from "@angular/http";
import {AuthHttp, tokenNotExpired, JwtHelper} from "angular2-jwt";
import {Globals} from "../common/globals";

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private http: Http, private authHttp: AuthHttp) {
  }

  getToken() {
    return localStorage.getItem(Globals.tokenKey)
  }

  isConnected() {
    if (localStorage.getItem(Globals.tokenKey) && tokenNotExpired(Globals.tokenKey)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  login(identifier, password) {
    const body = JSON.stringify({identifier, password});
    return this.http.post(Globals.getUrl('/auth/local'), body, {headers: contentHeaders});
  }

  logout() {
    console.log(contentHeaders, contentHeaders.toJSON())
    this.authHttp.get(Globals.getUrl('/auth/logout')).subscribe(
      response => {
        localStorage.removeItem(Globals.tokenKey);
        this.router.navigate(['/login']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }
}
