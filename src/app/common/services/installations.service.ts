import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {AppStore} from '../models/appstore.model';
import {Installation} from '../models/installation.model';

const BASE_URL = 'http://localhost:3000/installations/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class InstallationsService {
    installations: Observable<Array<Installation>>;

    constructor(private http: Http, private store: Store<AppStore>) {
        this.installations = store.select('installations');
    }

    loadInstallations() {
        this.http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: 'ADD_INSTALLATIONS', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    loadInstallation(installationId) {
        this.http.get(`${BASE_URL}${installationId}`)
            .map(res => res.json())
            .map(payload => ({ type: 'ADD_INSTALLATIONS', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    saveInstallation(installation: Installation) {
        (installation.id) ? this.updateInstallation(installation) : this.createInstallation(installation);
    }

    createInstallation(installation: Installation) {
        this.http.post(`${BASE_URL}`, JSON.stringify(installation), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_INSTALLATION', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateInstallation(installation: Installation) {
        this.http.put(`${BASE_URL}${installation.id}`, JSON.stringify(installation), HEADER)
            .subscribe(action => this.store.dispatch({ type: 'UPDATE_INSTALLATION', payload: installation }));
    }

    deleteInstallation(installation: Installation) {
        this.http.delete(`${BASE_URL}${installation.id}`)
            .subscribe(action => this.store.dispatch({ type: 'DELETE_INSTALLATION', payload: installation }));
    }
}