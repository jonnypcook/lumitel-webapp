import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import {Observable} from "rxjs/Observable";
import {InstallationService} from '../common/services/installation.service';
import {Installation} from '../common/models/installation.model';
import {LoaderComponent} from '../shared/loader.component';
import {DevicesService} from '../common/services/devices.service';
import {InstallationBaseComponent} from "../installation/installation.base.component";


@Component({
    templateUrl: './overview.component.html',
    providers: [InstallationService, LoaderComponent, DevicesService],
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends InstallationBaseComponent implements OnInit {
    constructor(private devicesService: DevicesService,
                installationService: InstallationService,
                route: ActivatedRoute,
                private router: Router) {
        super(installationService, route);
    }

    /**
     * click on the device summary card
     * @param type
     */
    deviceListClick(type: string) {
        this.router.navigate(['/installation', this.installationObject.installation_id, 'devices', type]);
    }

    /**
     * callback method used to indicate that installation has loaded
     */
    installationReady() {
        if ((this.installationObject.summary === undefined) || (this.installationObject.monitors === undefined)) {
            this.devicesService.loadInstallationMonitorAndSummary(this.installationObject.installation_id);
            return;
        }

        this.pageLoaded = ((this.installationObject.summary !== undefined) && (this.installationObject.monitors !== undefined));
    }

    /**
     * count the device types from overview structure
     * @param deviceTypes
     * @returns {number}
     */
    countTypes(...deviceTypes) {
        let total: number = 0;

        if (!this.installationObject || !this.installationObject.summary || this.installationObject.summary === undefined) {
            return total;
        }

        for (let i in deviceTypes) {
            let found = this.installationObject.summary.find(item => item.device_type_id === deviceTypes[i]);
            if (!found) {
                continue;
            }

            total += found.count;
        }

        return total;
    }

    /**
     * function to aid in traditional for loop
     * @param number
     * @returns {number[]}
     */
    public createRange(number) {
        var items: number[] = [];
        if (number >= 1) {
            for (var i = 1; i <= number; i++) {
                items.push(i);
            }
        }
        return items;
    }

    public brandPrimary:string =  '#20a8d8';
    public brandSuccess:string =  '#4dbd74';
    public brandInfo:string =   '#63c2de';
    public brandWarning:string =  '#f8cb00';
    public brandDanger:string =   '#f86c6b';

    // dropdown buttons
    public status: { isopen: boolean } = { isopen: false };
    public toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    //convert Hex to RGBA
    public convertHex(hex:string,opacity:number){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return rgba;
    }

    // events
    public chartClicked(e:any):void {
        // console.log(e);
    }

    public chartHovered(e:any):void {
        // console.log(e);
    }


    // mainChart

    public random(min:number, max:number) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    public mainChartElements:number = 27;
    public mainChartData1:Array<number> = [55,  77,  56,  32, 30,  59,  46,  11,  16,  16,  20,  12,  13,  0,   8,   18,  7,   0,  16,  28,  23,  31, 36,  35, 25,  21, 26,  45];
    public mainChartData2:Array<number> = [112, 93, 85, 46, 39, 94, 67, 44, 56, 60, 40, 37, 50, 0, 28, 53, 16, 0, 30, 55, 30, 42, 37, 38, 37, 39, 61, 59];
    public mainChartData3:Array<number> = [105, 122, 121, 68, 54, 151, 105, 81, 76, 73, 55, 49, 61, 0, 38, 78, 30, 0, 46, 83, 45, 66, 84, 80, 54, 48, 82, 71];
    public mainChartData4:Array<number> = [];

    public mainChartData:Array<any> = [
        {
            data: this.mainChartData1,
            label: 'Phase 1'
        },
        {
            data: this.mainChartData2,
            label: 'Phase 2'
        },
        {
            data: this.mainChartData3,
            label: 'Phase 3'
        },
        {
            data: this.mainChartData4,
            label: 'Total'
        }
    ];
    public mainChartLabels:Array<any> = ['1st (wed)', '2nd (thu)', '3rd (fri)', '4th (sat)', '5th (sun)', '6th (mon)', '7th (tue)', '8th (wed)', '9th (thu)', '10th (fri)', '11th (sat)', '12th (sun)', '13th (mon)', '14th (tue)', '15th (wed)', '16th (thu)', '17th (fri)', '18th (sat)', '19th (sun)', '20th (mon)', '21st (tue)', '22nd (wed)', '23rd (thu)', '24th (fri)', '25th (sat)', '26th (sun)', '27th (mon)', '28th (tue)'];
    public mainChartOptions:any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function(value:any) {
                        return value;
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(300 / 5),
                    max: 300
                }
            }]
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
        legend: {
            display: false
        }
    };
    public mainChartColours:Array<any> = [
        { //brandInfo
            backgroundColor: 'transparent',
            borderColor: this.brandInfo,
            pointHoverBackgroundColor: '#fff'
        },
        { //brandSuccess
            backgroundColor: 'transparent',
            borderColor: this.brandSuccess,
            pointHoverBackgroundColor: '#fff'
        },
        { //brandDanger
            backgroundColor: 'transparent',
            borderColor: this.brandWarning,
            pointHoverBackgroundColor: '#fff',
        },
        { //brandDanger
            backgroundColor: 'transparent',
            borderColor: this.brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5]
        }
        // { //brandDanger
        //     backgroundColor: 'transparent',
        //     borderColor: this.brandDanger,
        //     pointHoverBackgroundColor: '#fff',
        //     borderWidth: 1,
        //     borderDash: [8, 5]
        // }
    ];
    public mainChartLegend:boolean = false;
    public mainChartType:string = 'line';

    public phase1Total: number = 0;
    public phase2Total: number = 0;
    public phase3Total: number = 0;
    public phaseTotal: number = 0;

    ngOnInit(): any {
        for (var i = 0; i < this.mainChartData1.length; i++) {
            this.mainChartData4.push(this.mainChartData1[i] + this.mainChartData2[i] + this.mainChartData3[i]);
            this.phase1Total += this.mainChartData1[i];
            this.phase2Total += this.mainChartData2[i];
            this.phase3Total += this.mainChartData3[i];
            this.phaseTotal += (this.mainChartData1[i] + this.mainChartData2[i] + this.mainChartData3[i]);
        }

        return super.ngOnInit();
    }
}
