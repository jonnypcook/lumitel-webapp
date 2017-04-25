import {DELETE_SPACE, UPDATE_SPACE, CREATE_SPACE, ADD_SPACE, CLEAR_SPACE} from "./actions";
export const spaces = (state: any = [], {type, payload}) => {
    switch (type) {
        case ADD_SPACE:
            return payload;
        case CREATE_SPACE:
            return [...state, payload];
        case UPDATE_SPACE:
            return state.map(space => {
                return space.space_id === payload.space_id ? Object.assign({}, space, payload) : space;
            });
        case DELETE_SPACE:
            return state.filter(space => {
                return space.space_id !== payload.space_id;
            });
        case CLEAR_SPACE:
            return [];
        default:
            return state;
    }
};