import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
    templateUrl: './area-overview.component.html'
})
export class AreaOverviewComponent implements OnInit, OnDestroy {

    id: number;
    private sub: any;

    constructor (
        private route: ActivatedRoute
    ) {
        console.log('AreaOverviewComponent:');
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['aid']; // (+) converts string 'id' to a number
            console.log(this.id);
            // In a real app: dispatch action to load the details here.
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
