import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeadersInterceptor} from "./headers.interceptor";
import {LoggingInterceptor} from "./log.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
];
