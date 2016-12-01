import { NgModule }                 from '@angular/core';

import { OverviewComponent }            from './overview.component';

import { InstallationRoutingModule }       from './installation-routing.module';

@NgModule({
    imports: [ InstallationRoutingModule ],
    declarations: [
        OverviewComponent
    ]
})
export class InstallationModule { }
