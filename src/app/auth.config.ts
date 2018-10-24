import { Inject, InjectionToken } from '@angular/core';

import { CustomConfig } from 'ng2-ui-auth';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';

export const JWT_TOKEN_NAME: InjectionToken<string> = new InjectionToken(environment.authTokenName);

const API_CALLBACK_URL = environment.baseUrl;
const FACEBOOK_CLIENT_ID = '287747541710183';
const GOOGLE_CLIENT_ID = '756319907766-kjpnmkqek3i7pe5rc3aq6rpa7qf209id.apps.googleusercontent.com';
const INSTAGRAM_CLIENT_ID = '3a48002174d74508958a97ec8ec4a256';

export class AuthConfig extends CustomConfig {

    constructor(@Inject(JWT_TOKEN_NAME) jwtToken: BehaviorSubject<string>) {
        super();
        jwtToken.subscribe((value) => this.tokenName = value);
    }

    defaultHeaders = { 'Content-Type': 'application/json' };

    headerTokenName = 'Set-Authorization';

    tokenSeparator = null;
    tokenPrefix = null;

    signupUrl = API_CALLBACK_URL + 'auth/signup';
    loginUrl = API_CALLBACK_URL + 'auth/login';
    refreshUrl = API_CALLBACK_URL + 'auth/refresh';

    providers = {
        facebook: {
            clientId: FACEBOOK_CLIENT_ID,
            url: API_CALLBACK_URL + 'auth/facebook'
        },
        google: {
            clientId: GOOGLE_CLIENT_ID,
            url: API_CALLBACK_URL + 'auth/google',
        },
        instagram: {
            clientId: INSTAGRAM_CLIENT_ID,
            url: API_CALLBACK_URL + 'auth/instagram',
        }
    };

    resolveToken = (response) => {
        let tokenObj = response;
        if (response instanceof Response) {
            tokenObj = response.json();
        }

        const accessToken = tokenObj.headers.get(this.headerTokenName);
        if (!accessToken) {
            console.warn('No token found');
            return null;
        }

        if (typeof accessToken === 'string') {
            return accessToken;
        }

        if (typeof accessToken !== 'object') {
            console.warn('No token found');
            return null;
        }

        const tokenRootData = this.tokenRoot && this.tokenRoot.split('.').reduce((o, x) => o[x], accessToken);

        const token = tokenRootData ? tokenRootData[this.tokenName] : accessToken[this.tokenName];
        if (token) {
            return token;
        }

        const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
        console.warn('Expecting a token named "', tokenPath, '".');

        return null;
    };
}