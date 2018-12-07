import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, Subject } from "rxjs/Rx";

import { JwtHelperService } from "./jwt-helper.service";

import { User } from "../models/user";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";
import { Comic } from "../models/comic";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private logger = new Subject<boolean>();

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
                    this.logger.next(true);
                }

                return response;
            });
    }

    isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }

    logout() {
        localStorage.clear();
        this.logger.next(false);
    }

    getLocalUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setLocalUser(user: User) {
        return JSON.parse(localStorage.getItem('user'));
    }

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
                    this.logger.next(true);
                }

                return response;
            });
    }

    updateProfile(profileForm: any, image?: File): Observable<User> {
        
        const formData = new FormData();

        formData.append('name', profileForm.name);
        formData.append('id', profileForm.id);
        if(image)
            formData.append('avatar', image);
        
        return this.http
            .put<any>(`${environment.baseUrl}my/profile`, formData)
            .map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.name && response.email && response.id) {
                    localStorage.setItem('user', JSON.stringify(response));
                    this.logger.next(true);
                }
                return response;
            });
    }
}
