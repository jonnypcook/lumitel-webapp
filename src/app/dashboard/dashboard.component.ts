import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    constructor() {}

    public brandPrimary:string =  '#20a8d8';
    public brandSuccess:string =  '#4dbd74';
    public brandInfo:string =     '#63c2de';
    public brandWarning:string =  '#f8cb00';
    public brandDanger:string =   '#f86c6b';


    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    // lineChart1
    public lineChart1Data:Array<any> = [
        {
            data: [65, 59, 84, 84, 51, 55, 40],
            label: 'Series A'
        }
    ];
    public lineChart1Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart1Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 40 - 5,
                    max: 84 + 5,
                }
            }],
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart1Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandPrimary,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart1Legend:boolean = false;
    public lineChart1Type:string = 'line';

    // lineChart2
    public lineChart2Data:Array<any> = [
        {
            data: [1, 18, 9, 17, 34, 22, 11],
            label: 'Series A'
        }
    ];
    public lineChart2Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart2Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                }

            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false,
                    min: 1 - 5,
                    max: 34 + 5,
                }
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart2Colours:Array<any> = [
        { // grey
            backgroundColor: this.brandInfo,
            borderColor: 'rgba(255,255,255,.55)'
        }
    ];
    public lineChart2Legend:boolean = false;
    public lineChart2Type:string = 'line';


    // lineChart3
    public lineChart3Data:Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40],
            label: 'Series A'
        }
    ];
    public lineChart3Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChart3Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
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
            },
        },
        legend: {
            display: false
        }
    };
    public lineChart3Colours:Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
        }
    ];
    public lineChart3Legend:boolean = false;
    public lineChart3Type:string = 'line';


    // barChart1
    public barChart1Data:Array<any> = [
        {
            data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
            label: 'Series A'
        }
    ];
    public barChart1Labels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
    public barChart1Options:any = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        }
    };
    public barChart1Colours:Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,.3)',
            borderWidth: 0
        }
    ];
    public barChart1Legend:boolean = false;
    public barChart1Type:string = 'bar';

}
