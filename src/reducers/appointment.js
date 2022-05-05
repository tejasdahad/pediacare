export default (state = {} , action) => {
    switch(action.type) {
        case 'GET_APPOINTMENT':
            return {
                ...state,
                patientAppointments: action.payload
            };
        case 'GET_ALL_APPOINTMENT':
            return {
                ...state,
                appointments: action.payload
            };
        case 'DELETED_APPOINTMENT':
            return state;
        default:
            return state;
    }
};