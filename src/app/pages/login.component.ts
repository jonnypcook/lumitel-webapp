import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AuthenticationService } from '../common/services/authentication.service';
import { ToastrService } from 'toastr-ng2';

export class LoginDetails {
    username:string;
    password:string;
}

@Component({
    templateUrl: './login.component.html',
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    details:LoginDetails = {
        username: '',
        password: ''
    };
    currentProfileName = 'test';

    loading = false;
    returnUrl:string;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private authenticationService:AuthenticationService,
                private toastrService:ToastrService) {
    }

    /**
     * initialisation
     */
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
    }

    /**
     * login button action
     */
    login() {
        this.loading = true;
        this.authenticationService.login(this.details.username, this.details.password)
            .subscribe(
                data => {
                this.router.navigate([this.returnUrl]);
            },
                error => {
                this.toastrService.error("Login failed for the following reason: " + error);
                this.loading = false;
            }
        );
    }

    /**
     * enter key pressed in username or password
     */
    enterPressed() {
        if (this.loginReady()) {
            this.login();
        }
    }

    /**
     * check for login button readiness
     * @returns {boolean}
     */
    loginReady() {
        return this.details.username.length && this.details.password.length;
    }
}