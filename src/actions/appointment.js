import { firebase, firestore, googleAuthProvider } from '../firebase/firebase';

export const handlePatientApp = ({data1}) =>  async dispatch => {
    console.log(data1);
    const usersRef = await firestore.collection('appointments').doc().set({
        ...data1
    });

    console.log('Appointment request added');
}