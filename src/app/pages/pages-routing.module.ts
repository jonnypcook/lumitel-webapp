import {NgModule}                 from '@angular/core';
import {Routes, RouterModule}             from '@angular/router';

import {p403Component}            from './403.component';
import {p404Component}            from './404.component';
import {p500Component}            from './500.component';
import {LoginComponent}           from './login.component';
import {RegisterComponent}        from './register.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'System Pages'
        },
        children: [
            {
                path: '403',
                component: p403Component,
                data: {
                    title: 'Page 403'
                }
            },
            {
                path: '404',
                component: p404Component,
                data: {
                    title: 'Page 404'
                }
            },
            {
                path: '500',
                component: p500Component,
                data: {
                    title: 'Page 500'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login Page'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Register Page'
                }
            },
            {
                path: '**',
                redirectTo: '404'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
