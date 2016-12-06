import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
    templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit, OnDestroy {

    id: number;
    private sub: any;

    constructor (
        private route: ActivatedRoute
    ) {
        console.log('OverviewComponent:');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['iid']; // (+) converts string 'id' to a number
            console.log(this.id);
            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
