import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';
import { AppStore } from '../models/appstore.model';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

import { Installation } from '../models/installation.model';
import { User } from '../models/user.model';

const BASE_URL = 'http://localhost:3000/installations/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class InstallationsService {
    installations: Observable<Array<Installation>>;

    constructor(private http: Http, private store: Store<AppStore>, private authenticationService: AuthenticationService) {
        this.installations = store.select('installations');
    }

    getHeaders() {
        let user:User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    loadInstallations() {
        //console.log('loading ...');
        //console.log(this.authenticationService.getLogged());
        this.http.get(environment.api + 'installation', {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: 'ADD', payload: payload.data }))
            .subscribe(action => this.store.dispatch(action));
    }

    loadInstallation(installationId) {
        this.http.get(environment.api + 'installation/' + installationId, {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: 'ADD', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    saveInstallation(installation: Installation) {
        (installation.installationId) ? this.updateInstallation(installation) : this.createInstallation(installation);
    }

    createInstallation(installation: Installation) {
        this.http.post(`${BASE_URL}`, JSON.stringify(installation), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateInstallation(installation: Installation) {
        this.http.put(`${BASE_URL}${installation.installationId}`, JSON.stringify(installation), HEADER)
            .subscribe(action => this.store.dispatch({ type: 'UPDATE', payload: installation }));
    }

    deleteInstallation(installation: Installation) {
        this.http.delete(`${BASE_URL}${installation.installationId}`)
            .subscribe(action => this.store.dispatch({ type: 'DELETE', payload: installation }));
    }
}