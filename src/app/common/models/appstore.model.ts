import {Item} from './item.model';
import {Installation} from './installation.model';

export interface AppStore {
    items: Item[];
    installations: Installation[];
    selectedItem: Item;
};
