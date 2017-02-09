import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { AppStore } from '../models/appstore.model';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';

import { Installation } from '../models/installation.model';
import { User } from '../models/user.model';


@Injectable()
export class InstallationService {
    installation: Observable<Installation>;

    constructor(private http: Http, private store: Store<AppStore>, private authenticationService: AuthenticationService) {
        this.installation = store.select('installation');
    }

    getHeaders() {
        let user:User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    loadInstallation(installationId) {
        this.http.get(environment.api + 'installation/' + installationId, {headers: this.getHeaders()})
            .map(res => res.json())
            .map(payload => ({ type: 'SELECT_ITEM', payload }))
            .subscribe(action => this.store.dispatch(action));
    }
}