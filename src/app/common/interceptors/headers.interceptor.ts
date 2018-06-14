import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {contentHeaders} from "./headers";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const newReq = req.clone({
      setHeaders: contentHeaders
    });

    return next.handle(newReq);
  }

}
