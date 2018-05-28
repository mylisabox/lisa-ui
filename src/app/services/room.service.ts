import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Room} from "../models/room.type";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RoomService extends ApiService<Room> {

  constructor(protected _http: HttpClient,
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
