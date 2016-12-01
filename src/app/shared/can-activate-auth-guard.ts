import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        let loggedIn = this.authService.isLoggedIn();
        if (loggedIn !== true) {
            this.router.navigate(['/login']);
        }

        return loggedIn;
    }
}