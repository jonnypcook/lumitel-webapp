import { NgModule }                 from '@angular/core';

import { AreaOverviewComponent }            from './area-overview.component';

import { AreaRoutingModule }       from './area-routing.module';

@NgModule({
    imports: [ AreaRoutingModule ],
    declarations: [
        AreaOverviewComponent
    ]
})
export class AreaModule { }
