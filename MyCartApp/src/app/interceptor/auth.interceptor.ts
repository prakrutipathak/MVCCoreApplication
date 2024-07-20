import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../service/helpers/localstorage.service';
import { LocalStorageKeys } from '../service/helpers/localstoragekeys';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageHelper:LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.localStorageHelper.getItem(LocalStorageKeys.TokenName);
    if(token){
      const clonedReq=request.clone({
        headers:request.headers.set('Authorization',`Bearer ${token}`)

      });
      return next.handle(clonedReq);
    }else{
    return next.handle(request);
    }
  }
}
