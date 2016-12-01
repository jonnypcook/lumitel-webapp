import { NgModule }                 from '@angular/core';
import { Routes,
    RouterModule }             from '@angular/router';

import { OverviewComponent }            from './overview.component';

const routes: Routes = [
    {
        path: ':iid',
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
                component: OverviewComponent,
                data: {
                    title: 'Overview'
                }
            },
            {
                path: 'area',
                loadChildren: 'app/area/area.module#AreaModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstallationRoutingModule {
    constructor () {
        console.log('InstallationRoutingModule:');
    }

}
