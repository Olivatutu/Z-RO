import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isPublic =
      req.url.includes('/api/accounts/login/') ||
      req.url.includes('/api/accounts/register/');

    if (isPublic) return next.handle(req);

    const token = this.auth.token;
    if (!token) return next.handle(req);

    return next.handle(req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }));
  }
}
