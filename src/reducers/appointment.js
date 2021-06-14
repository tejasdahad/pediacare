export default (state = {} , action) => {
    switch(action.type) {
        case 'GET_APPOINTMENT':
            return {
                ...state,
                appointments: action.payload
            };
        default:
            return state;
    }
};