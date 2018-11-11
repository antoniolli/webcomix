import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, Subject } from "rxjs/Rx";

import { JwtHelperService } from "./jwt-helper.service";

import { User } from "../models/user";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(private jwt: JwtHelperService, private http: HttpClient) { }

    login(loginForm: any) {
        let payload = { 
            email: loginForm.email, 
            password: loginForm.password 
        }
        return this.http.post<any>(environment.baseUrl + '/auth/login', payload)
            .map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.auth_token && response.user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(environment.authTokenName, JSON.stringify(response.auth_token));
                    localStorage.setItem('user', JSON.stringify(response.user));
                }

                return response;
            });
    }

    logout() {
        localStorage.clear()
    }

    getLocalUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
    /**
     * Determines whether user is authenticated
     * @returns true if authenticated
     */
    isAuthenticated(): boolean {
        let token = this.jwt.tokenGetter();

        if (token) {
            if (!this.jwt.isTokenExpired()) {
                return true;
            }

            console.log(
                "Your token has expired in " + this.jwt.getTokenExpirationDate()
            );
        }

        return false;
    }

    persistUser(signUpForm: any): Observable<User> {
        let payload = {
            name: signUpForm.name,
            email: signUpForm.email,
            password: signUpForm.password,
            password_confirmation: signUpForm.passwordConfirmation
        }
        return this.http
            .post<any>(environment.baseUrl + "/signup", payload)
            .map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.auth_token && response.user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(environment.authTokenName, JSON.stringify(response.auth_token));
                    localStorage.setItem('user', JSON.stringify(response.user));
                }

                return response;
            });
    }
}
