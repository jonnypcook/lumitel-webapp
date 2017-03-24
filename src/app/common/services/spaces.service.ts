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
import {DELETE_SPACE, UPDATE_SPACE, CREATE_SPACE, ADD_SPACE} from "../stores/actions";

@Injectable()
export class SpacesService {
    spaces: Observable<Array<Space>>;

    constructor(private http: Http, private store: Store<AppStore>, private authenticationService: AuthenticationService) {
        // console.log('selecting "spaces" store');
        this.spaces = this.store.select('spaces');
    }

    getHeaders() {
        let user:User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    loadSpaces(installationId: number, ignoreRoot:boolean, parentId?: number) {
        let getParams:Array<string> = [];

        getParams.push('installationId=' + installationId);
        getParams.push('ignoreRoot=' + (ignoreRoot ? 1 : 0));

        if (!!parentId) {
            getParams.push('parentId=' + parentId);
        }

        this.http.get(environment.api + 'space?' + getParams.join('&'), {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: ADD_SPACE, payload: payload.data }))
            .subscribe(action => this.store.dispatch(action));
    }

    loadSpace(spaceId) {
        this.http.get(environment.api + 'space/' + spaceId, {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: ADD_SPACE, payload }))
            .subscribe(action => this.store.dispatch(action));
    }

}