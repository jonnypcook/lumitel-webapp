import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

//Layouts
import { FullLayoutComponent }      from './layouts/full-layout.component';
import { SimpleLayoutComponent }    from './layouts/simple-layout.component';

//Guards
import { CanActivateAuthGuard }          from './guards/can-activate-auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home',
        },
        canActivate: [CanActivateAuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'installation',
                loadChildren: './installation/installation.module#InstallationModule'
            }
        ]
    },
    {
        path: '',
        component: SimpleLayoutComponent,
        data: {
            title: 'Pages'
        },
        children: [
            {
                path: '',
                loadChildren: './pages/pages.module#PagesModule',
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
