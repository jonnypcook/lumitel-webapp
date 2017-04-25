import {SELECT_INSTALLATION, UPDATE_INSTALLATION, UPDATE_INSTALLATION_MONITOR} from "./actions";

export const installation = (state:any = null, {type, payload}) => {
    switch (type) {
        case SELECT_INSTALLATION:
            return payload;
        case UPDATE_INSTALLATION:
            return Object.assign({}, state, payload);
        case UPDATE_INSTALLATION_MONITOR:
            for (var i in state.monitors) {
                if (state.monitors[i].device_id === payload.device_id) {
                    state.monitors[i].last_reading_total = payload.data.last_reading_total;
                    state.monitors[i].last_reading_current = payload.data.last_reading_current;
                    state.monitors[i].last_reading_at = payload.data.last_reading_at;
                }
            }
            // state.monitors.map(monitor => {
            //     return monitor.device_id === payload.device_id ? Object.assign({}, monitor, payload.data) : monitor;
            // });
            return Object.assign({}, state);
            // return state;
        default:
            return state;
    }
};