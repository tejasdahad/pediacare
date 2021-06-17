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
            localStorage.removeItem('app')
            return {
                ...state,
                current: null
            };
        case 'SET_PRESCRIPTION':
            return {
                ...state,
                prescription: action.payload
            };
        default:
            return state;
    }
};