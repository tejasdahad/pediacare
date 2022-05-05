import React, { Fragment, useEffect } from 'react';
import Navigation from './navigation'
import { connect } from 'react-redux';
import { getAppointments } from '../actions/appointment';
import AppointmentTable from './AppointmentTable';

const Appointment = ({getAppointments, uid, appointments}) => {
    useEffect(() =>{
        getAppointments(uid);
    },[]);
    return (
        <Fragment>
            <Navigation />
            <AppointmentTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    uid : state.auth.uid,
    appointments: state.appoi.appointments
});

const mapDispatchToProps = (dispatch) => ({
    getAppointments: (uid) => dispatch(getAppointments(uid))
});

export default connect(mapStateToProps,mapDispatchToProps)(Appointment);