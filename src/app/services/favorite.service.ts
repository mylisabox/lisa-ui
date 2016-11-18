import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Device} from "../models/device.type";

@Injectable()
export class FavoriteService extends ApiService<Device> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/favorite')
  }
}
