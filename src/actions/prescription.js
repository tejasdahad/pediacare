import { firebase, firestore, googleAuthProvider } from '../firebase/firebase';

export const setCurrent = ({uid}) => async dispatch => {
    dispatch({
        type:'SET_CURRENT',
        payload: uid
    })
    
};

export const removeCurrent = () => ({
    type:'REMOVE_CURRENT'
});