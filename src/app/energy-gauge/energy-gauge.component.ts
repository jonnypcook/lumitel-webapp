///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {GaugeSegment, GaugeLabel} from 'ng2-kw-gauge';
import {DeviceService, DeviceDataType} from '../common/services/device.service';
import {Observable} from "rxjs/Observable";


@Component({
    selector: 'app-energy-gauge',
    providers: [DeviceService],
    templateUrl: './energy-gauge.component.html',
    styleUrls: ['./energy-gauge.component.scss']
})
export class EnergyGaugeComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        if (!!this.sub) {
            this.sub.unsubscribe();
        }
    }

    @Input() public themeName:string;
    @Input() public deviceId:number;
    @Input() public refresh:number;
    @Input() public target:number;
    @Input() public water:boolean=false;
    @Input() public energyMax:number=80;


    public theme = {
        power: {
            background:  '#14143e',
            day: '#fff',
            current: '#fd1c49',
            gaugeLow: '#f0c800',
            gaugeMediumLow: '#f0aa2a',
            gaugeMedium: '#f08038',
            gaugeMediumHigh: '#f04e35',
            gaugeHigh: '#fd1c49',
            target: '#437aff',
        },
        water: {
            background:  '#14143e',
            day: '#fff',
            current: '#fd1c49',
            gaugeLow: '#05d1ff',
            gaugeMediumLow: '#45a8ff',
            gaugeMedium: '#437aff',
            gaugeMediumHigh: '#3745ff',
            gaugeHigh: '#2b0fff',
            target: '#4dbd74',
        }
    };

    public progressGraph;
    private energy: GaugeSegment;
    private labelDay: GaugeLabel;
    private labelCurrent: GaugeLabel;

    /**
     *
     * @param value
     * @returns {any|string}
     */
    getGaugeValueColour(value: number) {
        if (value < 20) {
            return this.getThemeColour('gaugeLow');
        } else if (value < 40) {
            return this.getThemeColour('gaugeMediumLow');
        } else if (value < 60) {
            return this.getThemeColour('gaugeMedium');
        } else if (value < 80) {
            return this.getThemeColour('gaugeMediumHigh');
        } else {
            return this.getThemeColour('gaugeHigh');
        }
    }

    constructor(private deviceService:DeviceService) {
    }

    /**
     * refresh the gauge status
     */
    public refreshGauge() {
        if (!this.deviceId) {
            return;
        }

        let now: Date = new Date();
        let dateFrom: Date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        let dateTo: Date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));

        // this.deviceService.loadDeviceData(this.deviceId, DeviceDataType.energy, dateFrom, dateTo, 1, 1)
        //     .subscribe(deviceData => {
        //         if (!deviceData.paginator.totalRecords || deviceData.paginator.totalRecords <= 0) {
        //             return;
        //         }
        //
        //         if (this.water) {
        //             this.configureFlowGauge(deviceData.rows[0].total_day_use);
        //         } else {
        //             this.configureEnergyGauge(deviceData.rows[0].total_day_use, deviceData.rows[0].current_use);
        //         }
        //     });
    }

    /**
     * setup energy gauge
     * @param dayKw
     * @param currentKw
     */
    private configureEnergyGauge(dayKw: number, currentKw: number) {
        this.labelDay.text = 'Day: ' + (dayKw / 1000).toFixed(2) + ' kW';
        this.labelCurrent.text = 'Current: ' + (currentKw / 1000).toFixed(2) + ' kW';
        this.energy.value = ((currentKw / 100) / this.energyMax) * 100;
        this.energy.color = this.getGaugeValueColour(this.energy.value);
        this.labelCurrent.color = this.energy.color;
    }

    private configureFlowGauge(dayL: number) {
        this.labelCurrent.text = 'Current: ' + (dayL / 1000).toFixed(2) + ' L';
        this.energy.value = ((dayL / 1000) / (this.target * 2)) * 100;
        this.energy.color = this.getGaugeValueColour(this.energy.value);
        this.labelCurrent.color = this.energy.color;
    }

    /**
     * get theme colour
     * @param name
     * @returns {any}
     */
    private getThemeColour(name: string) {
        if (!!this.getTheme()[name]) {
            return this.getTheme()[name];
        }

        return '#000000';
    }

    /**
     * get selected theme
     * @returns any
     */
    private getTheme() {
        return !!this.theme[this.themeName] ? this.theme[this.themeName] : this.theme.power;
    }

    private timer;
    private sub;

    /**
     * initialisation
     */
    ngOnInit() {
        let labels: Array<GaugeLabel> = [];
        let gauges: Array<GaugeSegment> = [];

        if (this.water) {
            this.themeName = 'water';
            if (!this.target) {
                this.target = 15;
            }
            this.labelCurrent = this.createLabel('Current: 0 L', 'current', 0, 0, '1.1em');
            labels.push(this.labelCurrent);
            if (!!this.target) {
                this.labelDay = this.createLabel('Target: ' + this.target + ' L', 'target', 0, 20);
                labels.push(this.labelDay);
                gauges.push(new GaugeSegment({
                    value: (this.target / (this.target * 2)) * 100,
                    color: this.getThemeColour('target'),
                    radius: 78,
                    borderWidth: 16
                }));
            }
        } else {
            this.labelDay = this.createLabel('Day: 0kW', 'day', 0, 20);
            this.labelCurrent = this.createLabel('Current: 0 kW', 'current', 0, 0, '1.1em');
            labels.push(this.labelDay);
            labels.push(this.labelCurrent);
        }

        this.energy = new GaugeSegment({
            value: 1,
            color: this.getGaugeValueColour(1),
            borderWidth: 20
        });
        gauges.push(this.energy);

        this.progressGraph = {
            bgRadius: 70,
            bgColor: this.getThemeColour('background'),
            rounded: false,
            reverse: false,
            animationSecs: 1,
            labels: labels,
            segments: gauges
        };

        this.refreshGauge();
        if (!!this.refresh) {
            this.startRefreshTimer();
        }


    }

    private startRefreshTimer() {
        if (this.refresh < 30) {
            this.refresh = 30;
        }

        this.timer = Observable.timer(this.refresh * 1000, this.refresh * 1000);
        this.sub = this.timer.subscribe(t => {
            this.refreshGauge();
        });
    }

    private createLabel(text: string, colour: string, x: number, y: number, fontSize: string = '1em') {
        return new GaugeLabel({
            color: this.getThemeColour(colour),
            text: text,
            x: x,
            y: y,
            fontSize: fontSize
        });
    }



}
