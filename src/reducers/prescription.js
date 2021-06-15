export default (state = {} , action) => {
    switch(action.type) {
        case 'SET_CURRENT':
            localStorage.setItem('curr',action.payload);
            return {
                ...state,
                current: action.payload
            };
        case 'REMOVE_CURRENT':
            localStorage.removeItem('curr');
            return {
                ...state,
                current: null
            };
        default:
            return state;
    }
};