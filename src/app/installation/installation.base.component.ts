import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {InstallationService} from '../common/services/installation.service';
import {Installation} from '../common/models/installation.model';
import {LoaderComponent} from '../shared/loader.component';
import {DevicesService} from '../common/services/devices.service';
import {Subscription} from "rxjs";


@Component({
    template: ``,
    providers: [InstallationService]
})
export class InstallationBaseComponent implements OnInit, OnDestroy {
    installation: Observable<Installation>;
    installationObject: Installation;

    private _installationLoaded: boolean = false;
    private _pageLoaded: boolean = false;
    private routeSubscription: Subscription;

    get pageLoaded(): boolean {
        return this._pageLoaded;
    }

    set pageLoaded(value: boolean) {
        this._pageLoaded = value;
    }

    get installationLoaded(): boolean {
        return this._installationLoaded;
    }

    set installationLoaded(value: boolean) {
        this._installationLoaded = value;

        if (value === true) {
            this.installationReady();
        }
    }

    constructor(private installationService: InstallationService,
                private route: ActivatedRoute) {
    }

    /**
     * prepare installation
     * @param action
     * @param installationId
     */
    prepInstallation(action: any, installationId: number) {
        console.log(action);
        if (!!action && action.name && action.installation_id === installationId) {
            this.installationObject = action;
            this.installationLoaded = true;
        }
    }

    ngOnInit() {
        this.installation = this.installationService.installation;
        this.routeSubscription = this.route.params.subscribe(params => {
            this.installation.subscribe(action => this.prepInstallation(action, +params['iid']));
            if (this.installationLoaded !== true) {
                this.installationService.loadInstallation(+params['iid']);
            }
        });
    }


    installationReady() {
        this.pageLoaded = true;
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.installationLoaded = false;
        this.pageLoaded = false;
    }

}
