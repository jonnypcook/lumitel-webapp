import { NgModule }                 from '@angular/core';

import { SpaceListComponent } from './space-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { PaginationModule }               from 'ng2-bootstrap/pagination';
import { CommonModule }         from '@angular/common';

@NgModule({
    imports: [ PipesModule, CommonModule, FormsModule, PaginationModule.forRoot() ],
    declarations: [ SpaceListComponent ],
    providers: [],
    exports: [ SpaceListComponent ]
})
export class SpaceListModule { }
