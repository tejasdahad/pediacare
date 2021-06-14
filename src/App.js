import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import AppRouter, { history } from './routers/AppRouter';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

export default jsx;
let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(jsx, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid)).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/home');
            }
        });
        // store.dispatch(startSetExpenses()).then(() => {
        //     renderApp();
        //     if(history.location.pathname === '/') {
        //         history.push('/home');
        //     }
        // });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
})