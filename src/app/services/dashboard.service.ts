import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Globals} from "../common/globals";
import {Dashboard} from "../models/dashboard.type";

@Injectable()
export class DashboardService extends ApiService<Dashboard> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/dashboard')
  }

  getOrderedDeviceForRoom(roomId: string = ''): Observable<Dashboard> {
    return this._http.get(`${Globals.getUrl(this._path)}/room/${roomId}`, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<Dashboard>
  }

  saveDevicesOrderForRoom(roomId: string = '', widgets: Array<string>): Observable<Dashboard> {
    return this._http.post(`${Globals.getUrl(this._path)}/room/${roomId}`, widgets, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<Dashboard>
  }
}
