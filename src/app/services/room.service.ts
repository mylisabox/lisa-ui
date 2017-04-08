import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Room} from "../models/room.type";
import {Globals} from "../common/globals";
import {Observable} from "rxjs";
import {Device} from "../models/device.type";

@Injectable()
export class RoomService extends ApiService<Room> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/room')
  }

  public getRoomDevices(roomId: string): Observable<Array<Device>> {
    return this._http.get(Globals.getUrl(`${this._path}/${roomId}/devices`), this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getItems(criteria: any = {}): Observable<Array<T>> {
    criteria.sort = 'name';
    return super.getItem(criteria);
  }
}
