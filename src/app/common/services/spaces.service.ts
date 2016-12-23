import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { AppStore } from '../models/appstore.model';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

import { Space } from '../models/space.model';
import { User } from '../models/user.model';

@Injectable()
export class SpacesService {
    spaces: Observable<Array<Space>>;

    constructor(private http: Http, private store: Store<AppStore>, private authenticationService: AuthenticationService) {
        this.spaces = store.select('spaces');
    }

    getHeaders() {
        let user:User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    loadSpaces() {
        this.http.get(environment.api + 'space', {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: 'ADD', payload: payload.data }))
            .subscribe(action => this.store.dispatch(action));
    }

    loadSpace(spaceId) {
        this.http.get(environment.api + 'space/' + spaceId, {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: 'ADD', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

}