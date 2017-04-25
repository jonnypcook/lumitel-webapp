import {Http, Headers, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {AppStore} from '../models/appstore.model';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';

import {Installation} from '../models/installation.model';
import {User} from '../models/user.model';

import {SELECT_INSTALLATION, CLEAR_SPACE} from "../stores/actions";


export enum DeviceDataType {energy, temperature, event}
;

@Injectable()
export class DeviceService {
    devices: Observable<any>;


    constructor(private http: Http, private authenticationService: AuthenticationService) {
        // this.devices = this.store.select('devicedata');
    }

    /**
     * get authorization headers
     * @returns {Headers}
     */
    getHeaders() {
        let user: User = this.authenticationService.getLogged();
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + user.token.access_token);
        headers.append('Accept', 'application/json');

        return headers;
    }

    /**
     * load device data from API
     * @param deviceId
     * @param deviceDataType
     * @param dateFrom
     * @param dateTo
     * @param resultsPerPage
     * @param page
     * @returns {Observable<R>}
     */
    loadDeviceData(deviceId: number, deviceDataType: DeviceDataType, dateFrom: Date, dateTo: Date, resultsPerPage: number = 30, page: number = 1) {
        let params: URLSearchParams = new URLSearchParams();
        let type: string = DeviceDataType[deviceDataType];

        params.append('dateFrom', this.formatDateString(dateFrom));
        params.append('dateTo', this.formatDateString(dateTo));
        params.append('resultsPerPage', resultsPerPage.toString());
        params.append('page', page.toString());

        return this.http.get(environment.api + 'device/' + deviceId + '/data/' + type, {
            search: params,
            headers: this.getHeaders()
        })
            .map(res => {
                return res.json()
            })
            ;
    }

    /**
     * load device data from API
     * @param deviceId
     * @param deviceDataType
     * @param dateFrom
     * @param dateTo
     * @param resultsPerPage
     * @param page
     * @returns {Observable<R>}
     */
    loadLatestDeviceData(deviceId: number, deviceDataType: DeviceDataType) {
        let params: URLSearchParams = new URLSearchParams();
        let type: string = DeviceDataType[deviceDataType];

        return this.http.get(environment.api + 'device/' + deviceId + '/data/' + type + '/latest', {
            search: params,
            headers: this.getHeaders()
        })
            .map(res => {
                return res.json()
            })
            ;
    }

    /**
     * format date string to UTC format
     * @param date
     * @returns {string}
     */
    private formatDateString(date: Date) {
        return date.getUTCFullYear() + '-' +
            this.doubleDigits(date.getUTCMonth() + 1) + '-' +
            this.doubleDigits(date.getUTCDate()) + 'T' +
            this.doubleDigits(date.getUTCHours()) + ':' +
            this.doubleDigits(date.getUTCMinutes()) + ':' +
            this.doubleDigits(date.getUTCSeconds());
    }

    /**
     * ensure double digits
     * @param value
     * @returns {string}
     */
    private doubleDigits(value: number) {
        return (value < 10) ? '0' + value : '' + value;
    }


}