import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule}   from '@angular/forms';

import {AppComponent} from './app.component';
import {DropdownModule} from 'ng2-bootstrap/dropdown';
import {TabsModule} from 'ng2-bootstrap/tabs';
import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';

// http module
import {HttpModule} from '@angular/http';

// Routing Module
import {AppRoutingModule} from './app.routing';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';

//Authentication Guard
import {AuthenticationService} from './common/services/authentication.service';
import {AuthorizationService} from './common/services/authorization.service';
import {CanActivateAuthGuard}          from './guards/can-activate-auth-guard';
import {CanActivatePermissionGuard} from './guards/can-activate-permission-guard';
import {CanActivateRoleGuard} from './guards/can-activate-role-guard';

// global notifications (growl style)
import {ToastrModule} from 'toastr-ng2';

//Store
import {StoreModule} from '@ngrx/store';
import {items} from './common/stores/items.store';
import {installations} from './common/stores/installations.store';
import {selectedItem} from './common/stores/selectedItem.store';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        DropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        HttpModule,
        ToastrModule.forRoot(),
        StoreModule.provideStore({items, installations, selectedItem})
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },
        AuthenticationService,
        AuthorizationService,
        CanActivateAuthGuard,
        CanActivatePermissionGuard,
        CanActivateRoleGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
