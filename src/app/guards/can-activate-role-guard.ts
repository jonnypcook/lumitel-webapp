/**
 * Guard: CanActivateRoleGuard
 * Description: Guard to provide access to route based on authorization roles
 * Usage: set canActivate on route to [CanActivateRoleGuard] and add data object with
 * property roles to array of role names e.g. ['OWNER_READER', 'OWNER_UPDATER']
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthorizationService } from '../common/services/authorization.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivateRoleGuard implements CanActivate {

    constructor(private authorizationService: AuthorizationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!route.data || !route.data['roles']) {
            return true;
        }

        if (!this.authorizationService.hasRoles(route.data['roles'])) {
            this.router.navigate(['/403', { failedUrl: state.url }]);
        }

        return true;
    }
}