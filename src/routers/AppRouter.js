import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Landing from '../Landing';
import Navigation from '../components/navigation';
import { createBrowserHistory } from "history";
import Appointment from '../components/Appointment';
import AdminHome from '../components/AdminHome';
import Prescription from '../components/Prescription';
import PrescriptionForm from '../components/PrescriptionForm';
import PrescriptionPad from '../components/PrescriptionPad';
import Pres from '../components/Pres'
export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact path='/' component={LoginPage} />
                <PrivateRoute path='/home' component={Landing} />
                <PrivateRoute path='/appointments' component={Appointment} />
                <PrivateRoute path='/admin' component={AdminHome} />
                <PrivateRoute path='/prescription' component={Prescription} />
                <PrivateRoute path='/form' component={PrescriptionForm} />
                <PrivateRoute path='/pad' component={Pres} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;