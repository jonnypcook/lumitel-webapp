import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http:Http) {
    }

    /**
     * user object getter
     * @returns {User}
     */
    getLogged() {
        if (!localStorage.getItem('currentUser')) {
            let user:User;
            return user;
        }

        let user:User = JSON.parse(localStorage.getItem('currentUser'));

        return user;
    }

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
    login(username:string, password:string) {
        // ensure that we are logged out
        this.logout();

        // create login request
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
            {headers: headers}
        )
            .map((response:Response) => {
                // login successful if there's a jwt token in the response
                let token:Token = response.json();

                return token;
            })
            .flatMap((token:Token, index) => {
                let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token.access_token);
                headers.append('Accept', 'application/json');

                return Observable.forkJoin(
                    this.http.get(environment.api + 'user', {headers: headers}).map((response:Response) => {
                        let user:User = response.json();
                        user.token = token;

                        if (user && user.token && user.token.access_token) {
                            localStorage.setItem('currentUser', JSON.stringify(user));
                        }
                    }),
                    this.http.get(environment.api + 'user/permission', {headers: headers}).map((response:Response) => {
                        let authorization = response.json();

                        if (authorization && authorization.permissions && authorization.roles) {
                            localStorage.setItem('authorization', JSON.stringify(authorization));
                        }
                    })
                );
            });
    }

    /**
     * log user out
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authorization');
    }
}