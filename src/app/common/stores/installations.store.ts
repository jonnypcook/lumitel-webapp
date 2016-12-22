export const installations = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'ADD_INSTALLATIONS':
            return payload;
        case 'CREATE_INSTALLATION':
            return [...state, payload];
        case 'UPDATE_INSTALLATION':
            return state.map(installation => {
                return installation.installationId === payload.installationId ? Object.assign({}, installation, payload) : installation;
            });
        case 'DELETE_INSTALLATION':
            return state.filter(installation => {
                return installation.installationId !== payload.installationId;
            });
        default:
            return state;
    }
};