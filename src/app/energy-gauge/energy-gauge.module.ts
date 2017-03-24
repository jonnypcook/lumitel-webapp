import {NgModule}                 from '@angular/core';

import {EnergyGaugeComponent} from './energy-gauge.component';
import { FormsModule } from '@angular/forms';
import { GaugeModule } from 'ng2-kw-gauge';
import { CommonModule }         from '@angular/common';

@NgModule({
    imports: [GaugeModule, CommonModule, FormsModule],
    declarations: [EnergyGaugeComponent],
    providers: [],
    exports: [EnergyGaugeComponent]
})
export class EnergyGaugeModule {
}
