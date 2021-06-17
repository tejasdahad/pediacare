import { firebase, firestore, googleAuthProvider } from '../firebase/firebase';

export const setCurrent = ({uid}) => async dispatch => {
    dispatch({
        type:'SET_CURRENT',
        payload: uid
    })
    
};

export const clearCurrent = () => ({
    type:'REMOVE_CURRENT'
});

export const savePres = ({data}) => async dispatch => {
    const usersRef = await firestore.collection('prescription').doc().set({
        ...data
    });
    console.log(usersRef);
    
    firestore.collection('prescription').where('appoiId','==',data.appoiId).onSnapshot(async (snapshot) => {
        const data2=[];
        snapshot.forEach((doc) => data2.push({ ...doc.data(), id: doc.id }));
        console.log(data2);
        await firestore.collection('appointments').doc(data.appoiId).update({
            prescription: data2[0].id
        });
        dispatch({
            type:'SET_PRESCRIPTION',
            payload: data
        });
    });
}