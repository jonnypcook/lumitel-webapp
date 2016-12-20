import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../common/services/authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let loggedIn = this.authenticationService.isLoggedIn();
        if (loggedIn !== true) {
            this.router.navigate(['/login', { returnUrl: state.url }]);

        }

        return loggedIn;
    }
}