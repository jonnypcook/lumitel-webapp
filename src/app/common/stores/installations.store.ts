import {ADD_INSTALLATION, CREATE_INSTALLATION, UPDATE_INSTALLATION, DELETE_INSTALLATION} from "./actions";
export const installations = (state: any = [], {type, payload}) => {
    switch (type) {
        case ADD_INSTALLATION:
            return payload;
        case CREATE_INSTALLATION:
            return [...state, payload];
        case UPDATE_INSTALLATION:
            return state.map(installation => {
                return installation.installation_id === payload.installation_id ? Object.assign({}, installation, payload) : installation;
            });
        case DELETE_INSTALLATION:
            return state.filter(installation => {
                return installation.installation_id !== payload.installation_id;
            });
        default:
            return state;
    }
};