import { NgModule }                 from '@angular/core';

import { OverviewComponent }            from '../overview/overview.component';
import { InstallationsComponent }            from './installations.component';

import { InstallationRoutingModule }       from './installation-routing.module';

import { InstallationListModule } from '../installation-list/installation-list.module';
import { SpaceListModule } from '../space-list/space-list.module';
import { CommonModule }         from '@angular/common';

import { EnergyGaugeModule } from '../energy-gauge/energy-gauge.module';
import { LoaderComponent } from '../shared/loader.component';

import {PipesModule} from '../pipes/pipes.module';
import {DevicesComponent} from "../devices/devices.component";


@NgModule({
    imports: [ InstallationRoutingModule, InstallationListModule,
        SpaceListModule, CommonModule, EnergyGaugeModule, PipesModule],
    declarations: [
        OverviewComponent,
        InstallationsComponent,
        DevicesComponent,
        LoaderComponent,
    ],
    providers: []
})
export class InstallationModule { }
