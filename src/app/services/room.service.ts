import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Room} from "../models/room.type";
import {Observable} from "rxjs";

@Injectable()
export class RoomService extends ApiService<Room> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/room')
  }

  public getItems(criteria: any = {}): Observable<Array<Room>> {
    criteria.sort = 'name';
    return super.getItems(criteria);
  }

  public getLastLoadedRoom(): string {
    return localStorage.getItem('roomId');
  }
}
