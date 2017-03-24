import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {InstallationService} from '../common/services/installation.service';
import {Installation} from '../common/models/installation.model';
import {LoaderComponent} from '../shared/loader.component';
import {DevicesService} from '../common/services/devices.service';
import {InstallationBaseComponent} from "../installation/installation.base.component";


@Component({
    templateUrl: './overview.component.html',
    providers: [InstallationService, LoaderComponent, DevicesService],
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends InstallationBaseComponent {
    constructor(private devicesService: DevicesService,
                installationService: InstallationService,
                route: ActivatedRoute) {
        super(installationService, route);
    }

    /**
     * callback method used to indicate that installation has loaded
     */
    installationReady() {
        if ((this.installationObject.summary === undefined) || (this.installationObject.monitors === undefined)) {
            this.devicesService.loadInstallationMonitorAndSummary(this.installationObject.installation_id);
            return;
        }

        this.pageLoaded = ((this.installationObject.summary !== undefined) && (this.installationObject.monitors !== undefined));
    }

    /**
     * count the device types from overview structure
     * @param deviceTypes
     * @returns {number}
     */
    countTypes(...deviceTypes) {
        let total: number = 0;

        if (!this.installationObject || !this.installationObject.summary || this.installationObject.summary === undefined) {
            return total;
        }

        for (let i in deviceTypes) {
            let found = this.installationObject.summary.find(item => item.device_type_id === deviceTypes[i]);
            if (!found) {
                continue;
            }

            total += found.count;
        }

        return total;
    }

    /**
     * function to aid in traditional for loop
     * @param number
     * @returns {number[]}
     */
    public createRange(number) {
        var items: number[] = [];
        if (number >= 1) {
            for (var i = 1; i <= number; i++) {
                items.push(i);
            }
        }
        return items;
    }


}
