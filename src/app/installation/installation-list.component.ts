import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {InstallationsService} from '../common/services/installations.service.ts';
import {Store} from '@ngrx/store';
import {Installation} from '../common/models/installation.model';
import {AppStore} from '../common/models/appstore.model';

@Component({
    selector: 'installation-list',
    templateUrl: 'installation-list.component.html',
    providers: [InstallationsService]
})
export class InstallationListComponent implements OnInit, OnDestroy {
    installations: Observable<Array<Installation>>;
    public totalItems:number = 0;
    public currentPage:number = 1;
    public itemsPerPage:number = 2;

    constructor(private installationsService: InstallationsService) {
    }

    ngOnInit() {
        this.installations = this.installationsService.installations;
        this.installations.subscribe(action => this.prepInstallationsTableData(action));
        this.installationsService.loadInstallations();
    }

    ngOnDestroy() {
    }

    public prepInstallationsTableData(action:any):void {
        this.totalItems = action.length;
    }
}
