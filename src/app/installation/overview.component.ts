import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {InstallationService} from '../common/services/installation.service';
import {Installation} from '../common/models/installation.model';


@Component({
    templateUrl: './overview.component.html',
    providers: [InstallationService]
})
export class OverviewComponent implements OnInit, OnDestroy {
    installation: Observable<Installation>;
    private sub: any;

    information:any = {
        lighting: 0,
        hvac: 0,
        water: 0,
        devices: 0,
        hotWater: 0
    };

    constructor (
        private installationService: InstallationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.installation = this.installationService.installation;
        this.sub = this.route.params.subscribe(params => {
            this.installationService.loadInstallation(+params['iid']);
            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
