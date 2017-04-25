import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { OverviewComponent }            from '../overview/overview.component';
import { InstallationsComponent }            from './installations.component';
import { InstallationSettingsComponent } from '../installation-settings/installation-settings.component';
import { InstallationReportsComponent } from '../installation-reports/installation-reports.component';
import { EmergencyComponent } from '../emergency/emergency.component';
import { DevicesComponent } from "../devices/devices.component";
import {CanActivateDevicesGuard} from "../guards/can-activate-devices-guard";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Installations'
        },
        component: InstallationsComponent
    },
    {
        path: ':iid',
        data: {
            title: 'Installation'
        },
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full',
            },
            {
                path: 'overview',
                component: OverviewComponent,
                data: {
                    title: 'Overview'
                }
            },
            {
                path: 'devices/:type',
                component: DevicesComponent,
                canActivate: [CanActivateDevicesGuard],
                data: {
                    title: 'Devices'
                }
            },
            {
                path: 'settings',
                component: InstallationSettingsComponent,
                data: {
                    title: 'Settings'
                }
            },
            {
                path: 'emergency',
                component: EmergencyComponent,
                data: {
                    title: 'Emergency Reports'
                }
            },
            {
                path: 'reports',
                component: InstallationReportsComponent,
                data: {
                    title: 'Reports'
                }
            },
            {
                path: 'area',
                loadChildren: '../area/area.module#AreaModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstallationRoutingModule {
}
