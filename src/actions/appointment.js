import { firebase, firestore, googleAuthProvider } from '../firebase/firebase';

export const handlePatientApp = ({data1}) =>  async dispatch => {
    console.log(data1);
    const usersRef = await firestore.collection('appointments').doc().set({
        ...data1
    });

    console.log('Appointment request added');
}

export const getAppointments = (uid) => async dispatch => {
    const data = [];
    firestore.collection('appointments').where('patUid','==',uid).onSnapshot((snapshot) => {
        snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        console.log(data);
        dispatch({
            type:'GET_APPOINTMENT',
            payload: data
        });
    });
}

export const getAllAppointments = () => async dispatch => {
    const data = [];
    firestore.collection('appointments').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        console.log(data);
        dispatch({
            type:'GET_ALL_APPOINTMENT',
            payload: data
        });
    });
}



