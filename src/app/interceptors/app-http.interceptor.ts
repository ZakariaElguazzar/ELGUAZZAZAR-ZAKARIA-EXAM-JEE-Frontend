import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from "rxjs";
import {LoginService} from '../login.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const logService = inject(LoginService);
  const token = logService.accessToken
  if (!req.url.includes(("/auth/login"))){
    console.log(token)
    const logReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(logReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          logService.logout();
        }
        return throwError(() => new Error(err.message)); // Always return an observable
      })
    );
  }
  return next(req);
};

