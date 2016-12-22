import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
    templateUrl: './installations.component.html'
})
export class InstallationsComponent implements OnInit, OnDestroy {
    constructor (
        private route: ActivatedRoute
    ) {
        console.log('InstallationsComponent:');
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
