export const installation = (state:any = null, {type, payload}) => {
    switch (type) {
        case 'SELECT_ITEM':
            console.log('selecting ...');
            return payload;
        default:
            return state;
    }
};