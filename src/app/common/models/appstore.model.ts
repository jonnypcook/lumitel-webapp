import {Item} from './item.model';
import {Installation} from './installation.model';
import {Space} from './space.model';

export interface AppStore {
    items: Item[];
    installations: Installation[];
    installation: Installation;
    spaces: Space[];
    selectedItem: Item;
};
