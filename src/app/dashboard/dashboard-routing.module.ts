import { NgModule }             from '@angular/core';
import { Routes,
         RouterModule }         from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { CanActivatePermissionGuard } from '../guards/can-activate-permission-guard';
import { CanActivateRoleGuard } from '../guards/can-activate-role-guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Dashboard'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
