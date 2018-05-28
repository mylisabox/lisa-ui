import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Device} from "../models/device.type";
import {Observable} from "rxjs";
import {Globals} from "../common/globals";
import {WidgetEvent} from "../interfaces/widget-event.type";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DeviceService extends ApiService<Device> {

  constructor(protected _http: HttpClient,
              protected _authService: AuthService) {
    super(_http, _authService, '/device')
  }

  getDevicesWithoutRoom(): Observable<Array<Device>> {
    return this._http.get<Array<Device>>(`${Globals.getUrl(this._path)}?roomId=null`)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postDeviceValue(info: WidgetEvent): Observable<Device> {
    return this._http.post<Device>(`${Globals.getUrl('/plugins')}/${info.device.pluginName}/${info.device.id}`,
      {
        key: info.key,
        value: info.value
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postGroupValue(roomId: number, info: WidgetEvent): Observable<Array<Device>> {
    return this._http.post<Array<Device>>(`${Globals.getUrl('/devices/group')}/${roomId || ''}/${info.device.id}`,
      {
        key: info.key,
        value: info.value
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
