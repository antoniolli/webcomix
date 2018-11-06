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
    user: User = null;

    constructor(private jwt: JwtHelperService, private http: HttpClient) {}

    getLocalUser() {
        return this.user;
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

    changePassword(data): Observable<true> {
        return this.http
            .post<true>(environment.baseUrl + "account/change-password", data)
            .catch((error: any) => {
                return Observable.throw(error || "Server error");
            });
    }

    getUser(): Observable<User> {
        return this.http
            .get<User>(environment.baseUrl + "profile", {})
            .do(response => {
                this.user = <User>response;
            })
            .catch((error: any) => {
                return Observable.throw(error || "Server error");
            });
    }

    persist(user: User): Observable<User> {
        return this.http
            .post<User>(environment.baseUrl + "profile/persist", user)
            .catch((error: any) => {
                return Observable.throw(error || "Server error");
            });
    }

    checkAccess(accessCode: string, secret: string): Observable<User> {
        return this.http
            .post<User>(environment.baseUrl + "account/check-access", {
                code: accessCode,
                secret: secret
            })
            .catch((error: any) => {
                return Observable.throw(error || "Server error");
            });
    }

    updateAvatar(file: File): Observable<any> {
        let formData = new FormData();
        formData.append("file", file, file.name);

        return this.http
            .post(environment.baseUrl + "account/update-avatar", formData)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || "Server error"));
    }

    removeAvatar(): Observable<any> {
        return this.http
            .post(environment.baseUrl + "account/remove-avatar", {})
            .catch((error: any) => Observable.throw(error || "Server error"));
    }
}
