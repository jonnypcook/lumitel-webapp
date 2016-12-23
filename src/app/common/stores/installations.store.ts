export const installations = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'ADD':
            return payload;
        case 'CREATE':
            return [...state, payload];
        case 'UPDATE':
            return state.map(installation => {
                return installation.installationId === payload.installationId ? Object.assign({}, installation, payload) : installation;
            });
        case 'DELETE':
            return state.filter(installation => {
                return installation.installationId !== payload.installationId;
            });
        default:
            return state;
    }
};