import {Component, OnInit} from '@angular/core';
import {InstallationBaseComponent} from "../installation/installation.base.component";
import {InstallationService} from "../common/services/installation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss'],
    providers: [InstallationService]
})
export class DevicesComponent extends InstallationBaseComponent implements OnInit {


    constructor(installationService: InstallationService, route: ActivatedRoute) {
        super(installationService, route);
    }

    ngOnInit() {
        super.ngOnInit();
    }


}
