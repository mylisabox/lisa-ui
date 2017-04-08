import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {contentHeaders} from "../common/headers";
import {Http} from "@angular/http";
import {AuthHttp, tokenNotExpired, JwtHelper} from "angular2-jwt";
import {Globals} from "../common/globals";

@Injectable()
export class AuthService {
  userId: string;
  private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private http: Http, private authHttp: AuthHttp) {
  }

  getToken() {
    return localStorage.getItem(Globals.tokenKey)
  }

  setToken(token: string) {
    localStorage.setItem(Globals.tokenKey, token);
    this._parseToken();
  }

  private _parseToken() {
    const data = this._jwtHelper.decodeToken(this.getToken());
    this.userId = data.user.id;
  }

  isConnected() {
    if (this.getToken() && tokenNotExpired(Globals.tokenKey)) {
      if (!this.userId) {
        this._parseToken();
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  login(email, password) {
    const body = JSON.stringify({email, password});
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
