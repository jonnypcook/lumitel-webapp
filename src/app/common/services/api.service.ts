import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

import { User } from '../models/user.model';


@Injectable()
export class ApiService {
    constructor(private authenticationService: AuthenticationService) { }

    getHeaders() {
        let user:User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    getUrl(name:string) {
        return environment.api + name;
    }
}