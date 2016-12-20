import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    /**
     * check to see if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        return false;
    }

    /**
     * request login token
     * @param username
     * @param password
     * @returns {any}
     */
    login(username: string, password: string) {
        const body = new URLSearchParams();
        body.set('grant_type', 'password');
        body.set('client_id', environment.clientId);
        body.set('client_secret', environment.clientSecret);
        body.set('username', username);
        body.set('password', password);
        body.set('scope', '');

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(environment.auth + 'oauth/token',
            body.toString(),
            { headers: headers }
        )
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let token = response.json();
            if (token && token.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', token);
            }
        });
    }

    /**
     * log user out
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}