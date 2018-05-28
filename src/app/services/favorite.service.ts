import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Device} from "../models/device.type";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FavoriteService extends ApiService<Device> {

  constructor(protected _http: HttpClient,
              protected _authService: AuthService) {
    super(_http, _authService, '/favorite')
  }
}
