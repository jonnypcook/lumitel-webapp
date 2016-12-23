export const spaces = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'ADD':
            return payload;
        case 'CREATE':
            return [...state, payload];
        case 'UPDATE':
            return state.map(space => {
                return space.spaceId === payload.spaceId ? Object.assign({}, space, payload) : space;
            });
        case 'DELETE':
            return state.filter(space => {
                return space.spaceId !== payload.spaceId;
            });
        default:
            return state;
    }
};