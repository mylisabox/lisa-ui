import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {Plugin} from "../models/plugin.type";
import {Observable} from "rxjs/Observable";
import {Globals} from "../common/globals";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PluginService extends ApiService<Plugin> {

  constructor(protected _http: HttpClient,
              protected _authService: AuthService) {
    super(_http, _authService, '/plugin')
  }

  pairing(plugin, driver, data): Observable<Plugin> {
    return this._http.post<Plugin>(`${Globals.getUrl(this._path)}/${plugin}/drivers/${driver}/pairing`, data)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  search(query: string): Observable<Array<Plugin>> {
    return this._http.get(`${Globals.getUrl(this._path)}/search?${this._serialize({query: query, activated: true})}`)
      .map((plugins: Array<Plugin>) => {
        for (let plugin of plugins) {
          if (plugin.image) {
            plugin.image = Globals.getUrl(plugin.image)
          }
          for (let device of plugin.devicesSettings) {
            if (device['image']) {
              device['image'] = Globals.getUrl(device['image'])
            }
          }
        }
        return plugins;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
