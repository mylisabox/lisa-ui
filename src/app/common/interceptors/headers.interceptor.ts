import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {contentHeaders} from "./headers";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
    | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    const newReq = req.clone({
      setHeaders: contentHeaders
    });

    return next.handle(newReq);
  }

}
