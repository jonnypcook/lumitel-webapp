import {Component, OnInit, Input} from '@angular/core';
import {Installation} from "../common/models/installation.model";
import {Router} from "@angular/router";

@Component({
    selector: 'menu-installation',
    templateUrl: './menu-installation.component.html',
    styleUrls: ['./menu-installation.component.scss']
})
export class MenuInstallationComponent implements OnInit {
    @Input() public installation: Installation;
    @Input() public activeInstallationId: number;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    /**
     * determine if the component is loading
     * @returns {boolean}
     */
    isLoading():boolean {
        return !this.installation || this.installation.installation_id !== this.activeInstallationId;
    }

    /**
     * select installation
     * @param installation
     */
    public navigate(...page) {
        if (!this.installation.installation_id) {
            return;
        }

        this.router.navigate(['/installation', this.installation.installation_id].concat(page));
    }

}
