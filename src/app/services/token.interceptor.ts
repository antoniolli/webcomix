import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { JwtHelperService } from './jwt-helper.service';

import { JWT_TOKEN_NAME } from '../auth.config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    tokenName: string;

    constructor(
        private router: Router,
        private jwt: JwtHelperService,
        @Inject(JWT_TOKEN_NAME) private jwtToken: BehaviorSubject<string>
    ) {
        this.jwtToken.subscribe((name) => this.tokenName = name);
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localToken = localStorage.getItem(this.tokenName);
        if (localToken)
            request = this.addToken(request, localToken);

        return next.handle(request)
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const headers: HttpHeaders = event.headers;
                    
                    if (headers.has("Authorization")) {
                        const newToken = headers.get("Authorization").replace(/Bearer/ig, "").trim();

                        console.log(`Saving new token as ${this.tokenName}...`);

                        const oldToken = this.jwt.tokenGetter();
                        if (oldToken) {
                            let tNew = this.jwt.decodeToken(newToken);
                            let tOld = this.jwt.decodeToken(oldToken);

                            if (tNew.exp > tOld.exp) {
                                localStorage.setItem(this.tokenName, newToken);
                            }
                        }
                        else {
                            localStorage.setItem(this.tokenName, newToken);
                        }
                    }
                }
            })
            .catch(error => {
                if (error.status === 401 || error.status === 403) {
                    this.router.navigate(['login']);
                }
                if (error.status === 500 && error.error === "MUST_COMPLETE_REGISTRATION") {
                    this.router.navigate(['admin', 'profile']);
                }
                return Observable.throw(error);
            });
    }
}