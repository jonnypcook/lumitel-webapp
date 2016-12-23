import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AreaOverviewComponent }    from './area-overview.component';

const routes:Routes = [
    {
        path: ':aid',
        data: {
            title: 'Example Pages'
        },
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full',
            },
            {
                path: 'overview',
                component: AreaOverviewComponent,
                data: {
                    title: 'Overview'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRoutingModule {
}
