import { NgModule }                 from '@angular/core';

import { SpaceListComponent } from './space-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { PaginationModule }               from 'ng2-bootstrap/components/pagination';
import { CommonModule }         from '@angular/common';

@NgModule({
    imports: [ PipesModule, CommonModule, PaginationModule ],
    declarations: [ SpaceListComponent ],
    providers: [],
    exports: [ SpaceListComponent ]
})
export class SpaceListModule { }
