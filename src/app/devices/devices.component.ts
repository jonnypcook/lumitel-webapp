import {Component, OnInit} from '@angular/core';
import {InstallationBaseComponent} from "../installation/installation.base.component";
import {InstallationService} from "../common/services/installation.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {DeviceGroups} from "../enums/device-groups.enum";

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss'],
    providers: [InstallationService]
})
export class DevicesComponent extends InstallationBaseComponent implements OnInit {
    private _deviceGroup: string;


    get deviceGroup(): string {
        return this._deviceGroup;
    }

    set deviceGroup(value: string) {
        this._deviceGroup = value;
    }

    constructor(installationService: InstallationService, route: ActivatedRoute) {
        super(installationService, route);
        route.params.subscribe(params => {
            this.deviceGroup = params['type'];
        });
    }

    ngOnInit() {
        super.ngOnInit();
    }


}
