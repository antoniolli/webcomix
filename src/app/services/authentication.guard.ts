import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { JwtHelperService } from './jwt-helper.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private jwt: JwtHelperService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.jwt.tokenGetter();
        if (token) {
            if (!this.jwt.isTokenExpired()) {
                return true;
            }

            console.log('Your token has expired in ' + this.jwt.getTokenExpirationDate());
        }

        console.log('Unauthenticated! Redirecting to login...');

        let querystring = '?redirectTo=' + state.url;

        this.router.navigateByUrl('login' + querystring);
        return false;
    }
}