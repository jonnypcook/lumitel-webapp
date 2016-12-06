import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { DashboardComponent }       from './dashboard.component';
import { DashboardRoutingModule }   from './dashboard-routing.module';
import { CommonModule}         from '@angular/common';
import { PaginationModule }               from 'ng2-bootstrap/components/pagination';
import { InstallationListComponent } from '../installation/installation-list.component';
import { Bob } from './bob.component';

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartsModule,
        CommonModule,
        PaginationModule
    ],
    declarations: [ DashboardComponent, InstallationListComponent, Bob ]
})
export class DashboardModule { }
