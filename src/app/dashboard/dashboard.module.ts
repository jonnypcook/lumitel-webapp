import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { DashboardComponent }       from './dashboard.component';
import { DashboardRoutingModule }   from './dashboard-routing.module';
import { CommonModule}         from '@angular/common';
import { Bob } from './bob.component';

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartsModule,
        CommonModule
    ],
    declarations: [ DashboardComponent, Bob]
})
export class DashboardModule { }
