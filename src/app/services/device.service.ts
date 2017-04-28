import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Device} from "../models/device.type";
import {Observable} from "rxjs";
import {Globals} from "../common/globals";
import {WidgetEvent} from "../interfaces/widget-event.type";

@Injectable()
export class DeviceService extends ApiService<Device> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/device')
  }

  getDevicesWithoutRoom(): Observable<Array<Device>> {
    return this._http.get(`${Globals.getUrl(this._path)}?roomId=null`, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postDeviceValue(info: WidgetEvent): Observable<Array<Device>> {
    return this._http.post(`${Globals.getUrl('/plugins')}/${info.device.pluginName}/${info.device.id}`,
      {
        key: info.key,
        value: info.value
      }, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
