import { NgModule }                 from '@angular/core';

import { CapitalizePipe } from './capitalize.pipe';
import { PagesPipe } from './pages.pipe';
import { IterableObjectPipe } from './iterable-object.pipe';

@NgModule({
    imports: [ ],
    declarations: [ CapitalizePipe, PagesPipe, IterableObjectPipe ],
    providers: [],
    exports: [ CapitalizePipe, PagesPipe, IterableObjectPipe ]
})
export class PipesModule { }
