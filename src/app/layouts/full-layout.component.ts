import {Component, OnInit, OnDestroy}            from '@angular/core';
import {ActivatedRoute, Router, NavigationStart, NavigationEnd, Route} from "@angular/router";
import {Subscription, Observable} from "rxjs";
import {Installation} from "../common/models/installation.model";
import {InstallationService} from "../common/services/installation.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html',
    providers: [InstallationService]
})
export class FullLayoutComponent implements OnInit, OnDestroy {
    private routerSubscription: Subscription;
    private installation: Observable<Installation>;
    private installationId: number;

    private currentInstallation: Installation;
    private currentInstallationId: number;
    public currentInstallationLoading: boolean = false;

    public date: Date;
    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};


    constructor(private installationService: InstallationService, private router:Router, private route: ActivatedRoute) {
    }

    public toggled(open: boolean): void {
        //console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void {
        this.date = new Date();
        this.installation = this.installationService.installation;
        this.installation.subscribe(params => {
            // if (!!params && params.installation_id === this.currentInstallationId) {
            //     this.currentInstallation = params;
            //     this.currentInstallationLoading = true;
            // } else {
            //     this.currentInstallationLoading = false;
            // }
        });

        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            let currentRoute = this.route.root,
                installationId:number = null;

            do {
                let childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(route => {
                    if(route.outlet === 'primary') {
                        route.params.subscribe(param => {
                            if (!!param['iid']) {
                                installationId = +param['iid'];
                            }
                        });
                        currentRoute = route;
                    }
                })
            } while(currentRoute);

            this.installationId = installationId;
        });


    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
}
