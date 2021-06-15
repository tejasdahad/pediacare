import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import appointReducer from '../reducers/appointment';
import prescReducer from '../reducers/prescription';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            appoi: appointReducer,
            presc: prescReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
