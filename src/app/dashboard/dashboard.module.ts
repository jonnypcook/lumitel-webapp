import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InstallationListModule } from '../installation/installation-list.module';

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartsModule,
        DropdownModule,
        InstallationListModule
    ],
    declarations: [ DashboardComponent ]
})
export class DashboardModule { }
