import { NgModule }                 from '@angular/core';

import { OverviewComponent }            from './overview.component';
import { InstallationsComponent }            from './installations.component';

import { InstallationRoutingModule }       from './installation-routing.module';

import { InstallationListModule } from '../installation/installation-list.module';
import { SpaceListModule } from './space-list.module';
import { CommonModule }         from '@angular/common';

@NgModule({
    imports: [ InstallationRoutingModule, InstallationListModule, SpaceListModule, CommonModule],
    declarations: [
        OverviewComponent,
        InstallationsComponent
    ],
    providers: []
})
export class InstallationModule { }
