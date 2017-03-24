import {SELECT_INSTALLATION, UPDATE_INSTALLATION} from "./actions";

export const installation = (state:any = null, {type, payload}) => {
    switch (type) {
        case SELECT_INSTALLATION:
            return payload;
        case UPDATE_INSTALLATION:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
};