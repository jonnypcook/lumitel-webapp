import { NgModule }                 from '@angular/core';

import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { PagesPipe } from '../pipes/pages.pipe';

@NgModule({
    imports: [ ],
    declarations: [ CapitalizePipe, PagesPipe ],
    providers: [],
    exports: [ CapitalizePipe, PagesPipe ]
})
export class PipesModule { }
