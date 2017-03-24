export interface Device {
    device_id: number;
    space_id: number;
    label: string;
    x: number;
    y: number;
    deviceType: {
        device_type_id: number,
        name: string,
    },
    provider: Array<any>
};
