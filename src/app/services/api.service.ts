import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Globals} from "../common/globals";
import {Model} from "../models/model.type";
import {HttpClient} from "@angular/common/http";

@Injectable()
export abstract class ApiService<T extends Model> {

  protected constructor(protected _http: HttpClient,
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

  public getItem(criteria: any): Observable<T> {
    return this._http.get<T>(`${Globals.getUrl(this._path)}?${this._serialize(criteria)}`)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public getItems(criteria: any = {}): Observable<Array<T>> {
    return this._http.get<Array<T>>(`${Globals.getUrl(this._path)}?${this._serialize(criteria)}`)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<Array<T>>;
  }

  public postItem(item: T): Observable<T> {
    return this._http.post<T>(Globals.getUrl(this._path), item)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public patchItem(item: T): Observable<T> {
    return this._http.patch<T>(`${Globals.getUrl(this._path)}/${item.id}`, item)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public putItem(item: T): Observable<T> {
    return this._http.put<T>(`${Globals.getUrl(this._path)}/${item.id}`, item)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

  public destroyItem(itemId: number | string): Observable<T> {
    return this._http.delete<T>(`${Globals.getUrl(this._path)}/${itemId}`)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) as Observable<T>;
  }

}
