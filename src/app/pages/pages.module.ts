import { NgModule }                 from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { p403Component }            from './403.component';
import { p404Component }            from './404.component';
import { p500Component }            from './500.component';
import { LoginComponent }           from './login.component';
import { RegisterComponent }        from './register.component';

import { PagesRoutingModule }       from './pages-routing.module';
import { WaveComponent } from 'ng-spin-kit/app/spinner/wave';

@NgModule({
    imports: [ PagesRoutingModule, FormsModule ],
    declarations: [
        p403Component,
        p404Component,
        p500Component,
        LoginComponent,
        RegisterComponent,
        WaveComponent
    ]
})
export class PagesModule { }
