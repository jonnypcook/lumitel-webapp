import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Space} from '../common/models/space.model';

import {SpacesService} from '../common/services/spaces.service';
import {Store} from '@ngrx/store';
import {AppStore} from '../common/models/appstore.model';


@Component({
    selector: 'space-list',
    templateUrl: './space-list.component.html',
    providers: [SpacesService]
})
export class SpaceListComponent implements OnInit, OnDestroy {
    spaces: Observable<Array<Space>>;
    public totalItems:number = 0;
    public currentPage:number = 1;
    @Input() public itemsPerPage:number = 2;
    @Input() public installationId:number;

    constructor(private spacesService: SpacesService, private router: Router) {}

    ngOnInit() {
        this.spaces = this.spacesService.spaces;
        this.spaces.subscribe(action => this.prepSpacesTableData(action));
        if (this.totalItems === 0) {
            this.spacesService.loadSpaces();
        }
    }

    ngOnDestroy() {}

    /**
     * check to see if installations are loading
     * @returns {boolean}
     */
    public loading() {
        return !this.totalItems;
    }

    /**
     * prepare installations table data on notification
     * @param action
     */
    public prepSpacesTableData(action:any):void {
        this.totalItems = 0;//action.length;
    }


}
