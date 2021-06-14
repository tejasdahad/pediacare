import { firebase, firestore, googleAuthProvider } from '../firebase/firebase';

export const login = ({user}) => async dispatch => {
    
    const usersRef = firestore.collection('users').doc(user.uid)

    usersRef.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists) {
        usersRef.onSnapshot((doc) => {
            console.log("Document exists");
        });
        } else {
        usersRef.set({
            name: user.displayName,
            email: user.email
        }) // create the document
        }
    });

    dispatch({
        type: 'LOGIN',
        uid: user.uid
    });
};

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};