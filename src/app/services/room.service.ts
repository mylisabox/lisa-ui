import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Room} from "../models/room.type";

@Injectable()
export class RoomService extends ApiService<Room> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/room')
  }
}
