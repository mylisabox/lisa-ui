import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Plugin} from "../models/plugin.type";
import {Observable} from "rxjs/Observable";
import {Globals} from "../common/globals";

@Injectable()
export class PluginService extends ApiService<Plugin> {

  constructor(protected _http: Http,
              protected _authService: AuthService) {
    super(_http, _authService, '/plugin')
  }

  pairing(plugin, driver, data) {
    return this._http.post(`${Globals.getUrl(this._path)}/${plugin}/drivers/${driver}/pairing`, data,
      this._buildOptions()).map((res: Response) => {
      const pairingData = res.json();

      return pairingData;
    })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  search(query: string): Observable<Array<Plugin>> {
    return this._http.get(`${Globals.getUrl(this._path)}/search?${this._serialize({query: query, activated: true})}`,
      this._buildOptions())
      .map((res: Response) => {
        const plugins = res.json();
        for (let plugin of plugins) {
          if (plugin.image) {
            plugin.image = Globals.getUrl(plugin.image)
          }
          for (let device of plugin.devicesSettings) {
            if (device.image) {
              device.image = Globals.getUrl(device.image)
            }
          }
        }
        return plugins;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
