export interface Device {
    device_id: number;
    space_id: number;
    label: string;
    x: number;
    y: number;
    last_reading_current: number,
    last_reading_total:number,
    last_reading_at: Date,
    deviceType: {
        device_type_id: number,
        name: string,
    },
    provider: Array<any>
};
