import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {DeviceGroups} from '../enums/device-groups.enum';

@Injectable()
export class CanActivateDevicesGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!route.params.hasOwnProperty('type')) {
            return false;
        }

        return DeviceGroups[route.params['type']] !== undefined;
    }
}