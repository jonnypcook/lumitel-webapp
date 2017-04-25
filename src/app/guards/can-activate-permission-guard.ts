/**
 * Guard: CanActivatePermissionGuard
 * Description: Guard to provide access to route based on authorization permissions
 * Usage: set canActivate on route to [CanActivatePermissionGuard] and add data object with
 * property permissions to array of permission names e.g. ['installation.create', 'installation.read']
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthorizationService } from '../common/services/authorization.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivatePermissionGuard implements CanActivate {

    constructor(private authorizationService: AuthorizationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!route.data || !route.data['permissions']) {
            return true;
        }

        if (!this.authorizationService.hasPermissions(route.data['permissions'])) {
            this.router.navigate(['/403', { failedUrl: state.url }]);
        }

        return true;
    }
}