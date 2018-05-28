import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Globals} from "../common/globals";
import {Dashboard} from "../models/dashboard.type";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DashboardService extends ApiService<Dashboard> {

  constructor(protected _http: HttpClient,
              protected _authService: AuthService) {
    super(_http, _authService, '/dashboard')
  }

  getOrderedDeviceForRoom(roomId?: number): Observable<Dashboard> {
    if (roomId) {
      localStorage.setItem('roomId', roomId + '');
    }
    else {
      localStorage.removeItem('roomId');
    }
    return this._http.get<Dashboard>(`${Globals.getUrl(this._path)}/room/${roomId || ''}`)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<Dashboard>
  }

  saveDevicesOrderForRoom(roomId: number, widgets: Array<string>): Observable<Dashboard> {
    return this._http.post<Dashboard>(`${Globals.getUrl(this._path)}/room/${roomId || ''}`, widgets)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<Dashboard>
  }
}
