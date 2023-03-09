import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {catchError, Observable} from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken()
    const cloned = request.clone({
      headers: request.headers.set("Authorization",
        "Bearer " + token)
    });
    return next.handle(cloned)
  }
}
