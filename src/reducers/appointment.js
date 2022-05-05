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
            return {
                ...state,
                appointments:appointments.filter((a) => {
                    return a.id!=action.payload
                })
            }
        default:
            return state;
    }
};