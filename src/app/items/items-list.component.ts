import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Item} from '../common/models/item.model';

@Component({
    selector: 'items-list',
    template: `
  <div *ngFor="let item of items"
    class="fem-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{item.name}}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{item.description}}
    </div>
  </div>
  `
})
export class ItemsList {
    @Input() public items: Item[];
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();
}
