import {Http, Headers, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/map';

import {AppStore} from '../models/appstore.model';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';

import {User} from '../models/user.model';
import {Observable} from "rxjs";
import {Installation} from "../models/installation.model";
import {UPDATE_INSTALLATION} from "../stores/actions";

@Injectable()
export class DevicesService {
    constructor(private http: Http, private store: Store<AppStore>, private authenticationService: AuthenticationService) {
        // console.log('selecting "devices" store');
    }

    getHeaders() {
        let user: User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    /**
     * load device summary
     * @param installationId
     * @param spaceId
     */
    loadDeviceSummary(installationId: number, spaceId?: number) {
        let params: URLSearchParams = new URLSearchParams();

        params.append('installationId', installationId.toString());

        if (!!spaceId) {
            params.append('spaceId', spaceId.toString());
        }

        return this.http.get(environment.api + 'device/summary', {search: params, headers: this.getHeaders()})
            .map(res => res.json());
    }

    /**
     * load devices
     * @param installationId
     * @param spaceId
     */
    loadDevices(installationId: number, metering: boolean = false, spaceId?: number) {
        let params: URLSearchParams = new URLSearchParams();

        params.append('installationId', installationId.toString());

        if (!!spaceId) {
            params.append('spaceId', spaceId.toString());
        }

        if (metering === true) {
            params.append('metering', '1');
        }

        return this.http.get(environment.api + 'device', {
            search: params,
            headers: this.getHeaders()
        }).map(res => res.json());
    }

    /**
     * load installation summary and monitor data and add to installation store
     * @param installationId
     * @returns {AnonymousSubscription|any|o.Statement[]|Subscription|TeardownLogic|Object}
     */
    loadInstallationMonitorAndSummary(installationId: number) {
        return Observable.forkJoin(
            this.loadDeviceSummary(installationId).map(payload => ({summary: payload})),
            this.loadDevices(installationId, true)
                .map(payload => ({monitors: payload.data}))
                .map(payload => {
                    for(let i in payload.monitors) {
                        if (!!payload.monitors[i].last_reading_at) {
                            payload.monitors[i].last_reading_at = new Date(payload.monitors[i].last_reading_at);
                        }
                    }

                    return payload;
                })
        ).subscribe(payload => {
            let action = {
                type: UPDATE_INSTALLATION, payload: {
                    summary: payload[0].summary,
                    monitors: payload[1].monitors
                }
            };
            this.store.dispatch(action);
        });
    }


}
