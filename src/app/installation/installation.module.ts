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
import {DeviceListModule} from '../device-list/device-list.module';
import {TargetsWidgetComponent} from "../targets-widget/targets-widget.component";

import {TooltipModule} from 'ng2-bootstrap/tooltip';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import {InstallationSettingsComponent} from "../installation-settings/installation-settings.component";
import {EmergencyComponent} from "../emergency/emergency.component";



@NgModule({
    imports: [ InstallationRoutingModule, InstallationListModule,
        SpaceListModule, CommonModule, EnergyGaugeModule, PipesModule,
        DeviceListModule, TooltipModule,
        ChartsModule],
    declarations: [
        OverviewComponent,
        InstallationsComponent,
        DevicesComponent,
        LoaderComponent,
        TargetsWidgetComponent,
        InstallationSettingsComponent,
        EmergencyComponent
    ],
    providers: []
})
export class InstallationModule { }
