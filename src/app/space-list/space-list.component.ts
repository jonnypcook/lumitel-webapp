import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Space} from '../common/models/space.model';
import {Installation} from '../common/models/installation.model';

import {SpacesService} from '../common/services/spaces.service';


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
    @Input() public installation:Installation;
    @Input() public parentId:number;
    @Input() public ignoreRoot:boolean;

    constructor(private spacesService: SpacesService, private router: Router) {}

    ngOnInit() {
        this.spaces = this.spacesService.spaces;
        this.spaces.subscribe(action => this.prepSpacesTableData(action));
        if (this.totalItems === 0) {
            this.spacesService.loadSpaces(this.installation.installation_id, this.ignoreRoot, this.parentId);
        }
    }

    ngOnDestroy() {}

    public spaceSelected(space: Space) {
        console.log('click: ' + space.name);
    }

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
        this.totalItems = action.length;
    }


}
