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

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      console.log(user);
        store.dispatch(login({user}))
        renderApp();
        if(history.location.pathname === '/') {
            history.push('/home');
            window.location.reload();
        }
        
        // store.dispatch(startSetExpenses()).then(() => {
        //     renderApp();
        //     if(history.location.pathname === '/') {
        //         history.push('/home');
        //     }
        // });
    } else {
        console.log(history.location.pathname);
        store.dispatch(logout());
        history.push('/');
        renderApp();
    }
})

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('app')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
