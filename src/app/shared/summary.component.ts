import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Installation} from "../common/models/installation.model";
import {InstallationService} from "../common/services/installation.service";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";

@Component({
    selector: 'summary',
    template: `<small class="pull-right"><span *ngIf="activatedRoute && !!installationObject">Installation: {{ installationObject.name }}</span></small>`,
    providers: [InstallationService]
})
export class SummaryComponent  implements OnInit, OnDestroy {
    installation: Observable<Installation>;
    installationObject: Installation;
    activatedRoute: boolean = false;
    private sub: Subscription;

    constructor(private installationService: InstallationService, private router: Router) {}

    ngOnInit() {
        this.installation = this.installationService.installation;
        this.installation.subscribe(installation => {
            this.installationObject = installation;
        });

        this.sub = this.router.events.subscribe(params => {
            // console.log('route change');
            if (params instanceof NavigationEnd) {
                this.activatedRoute = !!params.url.match(/installation[\\/]/);
            }
        });

    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }

}
