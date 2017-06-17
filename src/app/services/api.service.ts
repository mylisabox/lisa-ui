import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Globals} from "../common/globals";
import {Model} from "../models/model.type";

@Injectable()
export abstract class ApiService<T extends Model> {

  constructor(protected _http: Http,
              protected _authService: AuthService,
              protected _path: string) {

  }

  protected _serialize(obj: any) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  protected _buildHeaders() {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this._authService.getToken()
    });
  }

  protected _buildOptions() {
    let options = new RequestOptions({headers: this._buildHeaders()}); // Create a request option
    return options;
  }

  public getItem(criteria: any): Observable<T> {
    return this._http.get(`${Globals.getUrl(this._path)}?${this._serialize(criteria)}`, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public getItems(criteria: any = {}): Observable<Array<T>> {
    return this._http.get(`${Globals.getUrl(this._path)}?${this._serialize(criteria)}`, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<Array<T>>;
  }

  public postItem(item: T): Observable<T> {
    return this._http.post(Globals.getUrl(this._path), item, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public patchItem(item: T): Observable<T> {
    return this._http.patch(`${Globals.getUrl(this._path)}/${item.id}`, item, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public putItem(item: T): Observable<T> {
    return this._http.put(`${Globals.getUrl(this._path)}/${item.id}`, item, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public destroyItem(itemId: String): Observable<T> {
    return this._http.delete(`${Globals.getUrl(this._path)}/${itemId}`, this._buildOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

}
