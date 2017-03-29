import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Installation} from "../common/models/installation.model";
import {installation} from "../common/stores/installation.store";
import {Device} from "../common/models/device.model";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'targets-widget',
    templateUrl: './targets-widget.component.html',
    styleUrls: ['./targets-widget.component.scss'],
    /* tslint:disable no-unused-css*/
    styles: [`
:host >>> .tooltip-inner {
  font-size: 0.8em
}
  `]
})
export class TargetsWidgetComponent implements OnInit, OnDestroy {
    @Input() public installation: Observable<Installation>;
    private currentInstallation: Installation;

    public totalPower:number = 0;
    public targetPower:number = 200;
    public percentagePower: number = 0;

    public totalWater:number = 0;
    public targetWater:number = 20;
    public percentageWater: number = 0;

    public totalCarbon:number = 0;
    public targetCarbon:number = 80;
    public percentageCarbon: number = 0;

    public totalMethane:number = 0;
    public targetMethane:number = 0.078;
    public percentageMethane: number = 0;

    public weekly:any = [
        {
            power: 172.196,
            water: 15.789,
            targetPower: 200,
            targetWater: 20,
        },
        {
            power: 174.196,
            water: 15.071,
            targetPower: 200,
            targetWater: 20,
        },
        {
            power: 169.364,
            water: 14.956,
            targetPower: 200,
            targetWater: 20,
        },
        {
            power: 107.517,
            water: 11.606,
            targetPower: 120,
            targetWater: 15,
        },
        {
            power: 116.702,
            water: 14.454,
            targetPower: 120,
            targetWater: 15,
        },
        {
            power: 153.023,
            water: 14.368,
            targetPower: 200,
            targetWater: 20,
        },
    ];

    private sub: Subscription;

    constructor() {
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.sub = this.installation.subscribe(action => {
            if (!action.installation_id) {
                return;
            }

            this.currentInstallation = action;

            this.totalPower = (this.findTotal(6) / 1000);
            this.totalWater = (this.findTotal(5) / 1000);
            this.totalCarbon = (this.totalPower * 0.40957);
            this.totalMethane = (this.totalPower * 0.00039);
            this.percentagePower = this.calculatePercentage(this.totalPower, this.targetPower);
            this.percentageWater = this.calculatePercentage(this.totalWater, this.targetWater);
            this.percentageCarbon = this.calculatePercentage(this.totalCarbon, this.targetCarbon);
            this.percentageMethane = this.calculatePercentage(this.totalMethane, this.targetMethane);
        });
    }

    calculatePercentage(numerator: number, denominator: number):number {
        if (denominator <= 0) {
            return 1;
        }

        return (numerator / denominator) * 100;
    }

    sanitizePercentage(percentage: number):number {
        return (percentage > 100) ? 100 : percentage;
    }

    findTotal(deviceTypeId: number):number {
        let total:number = 0;

        if (!this.currentInstallation.monitors) {
            return total;
        }

        let monitors = this.currentInstallation.monitors.filter(monitor => {
            return monitor.deviceType.device_type_id === deviceTypeId
        });


        for (var i in monitors) {
            if (!monitors[i].last_reading_total) {
                continue;
            }

            total += monitors[i].last_reading_total;
        }

        return total;

    }

}
