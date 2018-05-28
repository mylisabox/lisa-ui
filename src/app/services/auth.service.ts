import {Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {Globals} from "../common/globals";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Auth} from "../models/auth.type";

@Injectable()
export class AuthService {
  userId: string;

  constructor(private injector: Injector, private router: Router, private http: HttpClient) {
  }

  getToken() {
    return localStorage.getItem(Globals.tokenKey)
  }

  private setToken(token: string) {
    localStorage.setItem(Globals.tokenKey, token);
    this._parseToken();
  }

  private _parseToken() {
    const jwtService = this.injector.get(JwtHelperService)
    const data = jwtService.decodeToken(this.getToken());
    this.userId = data.user.id;
  }

  isInitialized() {
    return this.http.get(Globals.getUrl('/initialized'));
  }

  isConnected() {
    const jwtService = this.injector.get(JwtHelperService)

    if (!jwtService.isTokenExpired()) {
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
    return this.http.post<Auth>(Globals.getUrl('/auth/local'), body)
      .map(response => {
        this.setToken(response.token)
        return response
      });
  }

  register(email, password) {
    const body = JSON.stringify({email, password});
    return this.http.post<Auth>(Globals.getUrl('/auth/local/register'), body)
      .map(response => {
        this.setToken(response.token)
        return response
      });
  }

  logout() {
    return this.http.get(Globals.getUrl('/auth/logout')).subscribe(
      response => {
        localStorage.removeItem(Globals.tokenKey);
        return this.router.navigate(['/login']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }
}
