import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { JwtHelperService } from './jwt-helper.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private jwt: JwtHelperService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let auth_token = JSON.parse(localStorage.getItem(environment.authTokenName));
        if (auth_token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${auth_token}`
                }
            });
        }
 
        return next.handle(request);
    }
}