import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { DashboardComponent }       from './dashboard.component';
import { DashboardRoutingModule }   from './dashboard-routing.module';
import { InstallationListModule } from '../installation/installation-list.module';

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartsModule,
        InstallationListModule
    ],
    declarations: [ DashboardComponent ]
})
export class DashboardModule { }
