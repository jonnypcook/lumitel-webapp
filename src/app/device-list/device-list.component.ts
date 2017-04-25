import {Component, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DevicesService} from '../common/services/devices.service';
import {Device} from "../common/models/device.model";
import {Installation} from "../common/models/installation.model";

@Component({
    selector: 'device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss'],
    providers: [DevicesService],
})
export class DeviceListComponent implements OnInit {
    devices: Observable<Array<Device>>;
    private _loading: boolean = true;

    public totalItems:number = 0;
    public currentPage:number = 1;

    @Input() public itemsPerPage:number = 10;
    @Input() public installation:Installation;


    get loading(): boolean {
        return this._loading;
    }

    set loading(value: boolean) {
        this._loading = value;
    }

    constructor(private devicesService: DevicesService) {
    }

    ngOnInit() {
        this.devicesService.loadDevices(this.installation.installation_id)
            .subscribe(payload => {
                console.log(payload);
                this.prepDevicesTableData(payload.data);
                this.loading = false;
            });
    }

    prepDevicesTableData(devices: any) {
        this.devices = devices;
        this.totalItems = devices.length;
    }

}
