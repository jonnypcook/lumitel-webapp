import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { LocationStrategy,
         HashLocationStrategy }         from '@angular/common';

import { AppComponent }                 from './app.component';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES }      from './shared/nav-dropdown.directive';

import { ChartsModule }                 from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES }    from './shared/sidebar.directive';
import { AsideToggleDirective }         from './shared/aside.directive';
import { BreadcrumbsComponent }         from './shared/breadcrumb.component';

import {HttpModule} from '@angular/http';

// Routing Module
import { AppRoutingModule }             from './app.routing';

//Layouts
import { FullLayoutComponent }          from './layouts/full-layout.component';
import { SimpleLayoutComponent }          from './layouts/simple-layout.component';

//Authentication Guard
import { AuthService }          from './shared/auth.service';
import { CanActivateAuthGuard }          from './shared/can-activate-auth-guard';


//Store
import {StoreModule} from '@ngrx/store';
import {ItemsService} from './common/services/items.service';
import {items} from './common/stores/items.store';
import {installations} from './common/stores/installations.store';
import {selectedItem} from './common/stores/selectedItem.store';

//Redux
//import { NgReduxModule, NgRedux } from 'ng2-redux';
//const createLogger = require('redux-logger');

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        Ng2BootstrapModule,
        //NgReduxModule.forRoot(),
        ChartsModule,
        HttpModule,
        StoreModule.provideStore({items, installations, selectedItem})
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },
    AuthService,
    CanActivateAuthGuard],
    bootstrap: [ AppComponent ]
})
export class AppModule {
    //constructor(ngRedux: NgRedux<IAppState>) {
    //    ngRedux.configureStore(rootReducer, {}, [ createLogger() ]);
    //}
}
