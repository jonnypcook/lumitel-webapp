import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {InstallationsService} from '../common/services/installations.service';
import {Installation} from '../common/models/installation.model';


@Component({
    templateUrl: './overview.component.html',
    providers: [InstallationsService]
})
export class OverviewComponent implements OnInit, OnDestroy {
    installation: Installation;
    private sub: any;

    information:any = {
        lighting: 0,
        hvac: 0,
        water: 0,
        devices: 0,
        hotWater: 0
    };

    constructor (
        private installationsService: InstallationsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.installationsService.loadInstallation(+params['iid']);
            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
