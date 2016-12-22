import { NgModule }                 from '@angular/core';

import { InstallationListComponent } from './installation-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { PaginationModule }               from 'ng2-bootstrap/components/pagination';
import { CommonModule }         from '@angular/common';

@NgModule({
    imports: [ PipesModule, CommonModule, PaginationModule ],
    declarations: [ InstallationListComponent ],
    providers: [],
    exports: [ InstallationListComponent ]
})
export class InstallationListModule { }
