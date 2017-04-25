import {Component, Input} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import {Installation} from "../common/models/installation.model";

@Component({
    selector: 'breadcrumbs',
    template: `
  <template *ngIf="available()" ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item" *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/' || !!breadcrumb.installation || breadcrumb.label.title&&last" [ngClass]="{active: last}">
      <a *ngIf="!last && !breadcrumb.installation" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
      <a *ngIf="!last && !!breadcrumb.installation" [routerLink]="breadcrumb.url">{{ installation.name }}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
    </li>
  </template><div *ngIf="!available()">
    <li class="breadcrumb-item" [ngClass]="active">
      <span>Loading ...</span>
    </li>
  </div>`
})
export class BreadcrumbsComponent {
    @Input() public installation: Installation;
    @Input() public activeInstallationId: number;

    breadcrumbs: Array<Object>;
    constructor(private router:Router, private route:ActivatedRoute) {}
    ngOnInit(): void {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            this.breadcrumbs = [];
            let currentRoute = this.route.root,
                url = '',
                lastRouteName;
            do {
                let childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(route => {
                    if(route.outlet === 'primary') {
                        let routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                        let rUrl = routeSnapshot.url.map(segment => segment.path).join('/');

                        if (!!routeSnapshot.params['iid'] && rUrl.match(/^[\d]+$/) && lastRouteName === 'installation'){
                            this.breadcrumbs.push({
                                label: {title: 'installation'},
                                installation: true,
                                url:   url
                            });
                        } else {
                            this.breadcrumbs.push({
                                label: route.snapshot.data,
                                url:   url
                            });
                        }
                        lastRouteName = rUrl;
                        currentRoute = route;
                    }
                })
            } while(currentRoute);
        })
    }

    available():boolean {
        return (!this.activeInstallationId) || (!!this.installation && this.installation.installation_id === this.activeInstallationId);
    }


}
