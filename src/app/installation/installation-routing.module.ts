import { NgModule }                 from '@angular/core';
import { Routes,
    RouterModule }             from '@angular/router';

import { OverviewComponent }            from './overview.component';
import { InstallationsComponent }            from './installations.component';

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
            title: 'Installations'
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
