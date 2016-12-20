import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ItemsService} from '../common/services/items.service';
import {InstallationsService} from '../common/services/installations.service';
import {Observable} from "rxjs/Observable";
import {Store} from '@ngrx/store';
import {Item} from '../common/models/item.model';
import {Installation} from '../common/models/installation.model';
import {AppStore} from '../common/models/appstore.model';

@Component({
    selector: 'bob',
    template: `<div *ngFor="let item of items | async">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{item.name}}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{item.description}}
    </div>
  </div>
  <div *ngFor="let installation of installations | async">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{installation.name}}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{installation.description}}
    </div>
  </div>`,
    providers: [ItemsService, InstallationsService]
})
export class Bob implements OnInit {
    installation: Observable<Installation>;
    installations: Observable<Array<Installation>>;
    items: Observable<Array<Item>>;

    constructor(private itemsService: ItemsService,
                private installationsService: InstallationsService,
                private store: Store<AppStore>) {
    }

    ngOnInit() {
        this.items = this.itemsService.items;
        this.installations = this.installationsService.installations;

        this.itemsService.loadItems();
        this.installationsService.loadInstallations();

    }

}
