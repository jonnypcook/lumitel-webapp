import {SELECT_ITEM} from "./actions";
export const selectedItem = (state:any = null, {type, payload}) => {
    switch (type) {
        case SELECT_ITEM:
            return payload;
        default:
            return state;
    }
};