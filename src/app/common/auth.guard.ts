import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Http} from "@angular/http";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {contentHeaders} from "./headers";
import {Globals} from "./globals";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isConnected();
  }
}

export function createAuthHttp(http: Http) {
  const config: AuthConfig = new AuthConfig({
    noJwtError: true,
    tokenName: Globals.tokenKey,
    headerPrefix: 'JWT ',
    globalHeaders: [contentHeaders.toJSON()]
  });
  return new AuthHttp(config, http);
}


export const provideAuthGuard = {
  provide: AuthHttp,
  useFactory: createAuthHttp,
  deps: [Http]
}
