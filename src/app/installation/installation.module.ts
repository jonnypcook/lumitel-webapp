import { NgModule }                 from '@angular/core';

import { OverviewComponent }            from './overview.component';
import { InstallationsComponent }            from './installations.component';

import { InstallationRoutingModule }       from './installation-routing.module';

import { InstallationListModule } from '../installation/installation-list.module';

@NgModule({
    imports: [ InstallationRoutingModule, InstallationListModule ],
    declarations: [
        OverviewComponent,
        InstallationsComponent
    ],
    providers: []
})
export class InstallationModule { }
