import {Device} from "./device.model";
import {Address} from "./address.model";
import {DeviceTypeSummary} from "./device.type.summary.model";

export interface Installation {
    commissioned: string;
    installation_id: number;
    name: string;
    address: Address,
    summary: Array<DeviceTypeSummary>,
    monitors: Array<Device>
};