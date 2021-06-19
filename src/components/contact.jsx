import React,{ useState } from 'react'
import emailjs from 'emailjs-com'
import { connect } from 'react-redux';
import { handlePatientApp, getAllAppointments } from '../actions/appointment';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Typography, Button } from '@material-ui/core';

// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import { useEffect } from 'react';

const initialState = {
  name: '',
  email: '',
  prefDate:'',
  prefTime:'',
  phone:''
}
const Contact = ({data, handlePatientApp, uid, getAllAppointments, appointments}) => {
  useEffect(() => {
    getAllAppointments();
  },[]);

  
  const [{ name, email, prefDate, prefTime, phone }, setState] = useState(initialState);
  const [description,setDescription]=useState('');
  const [selectedDate, handleDateChange] = useState(new Date());
  const [slots, setSlots] = useState(["5:00","5:15","5:30","5:45","6:00","6:15","6:30","6:45"]);
  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => {
    setState({ ...initialState })
    handleDateChange(new Date());
    setDescription('');
  }
  useEffect(() => {
    console.log("In use")
    if(appointments){
      var at= formatDate(selectedDate);
      console.log(at)
      const temp = appointments.filter((a) => a.appDate==at);
      console.log(temp);
      var da=[];
      temp.map(a => {
        da.push(a.appTime);
      });
      var s = ["5:00","5:15","5:30","5:45","6:00","6:15","6:30","6:45"];
      s = s.filter(val => !da.includes(val));
      console.log(s);
      setSlots(s);
    }
    
  },[appointments, selectedDate]);

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

  const handleSubmit = (e) => {
    e.preventDefault()
    var a=formatDate(selectedDate);
    const data1 ={
      name, email, description, phone, appDate: a, appTime:prefTime, prescription:'', patUid:uid
    }
    console.log(data1);

    handlePatientApp({data1});
    emailjs
      .sendForm(
        'service_a2ku5vd', 'template_oq6w4ml', e.target,'user_z1aRq6nlDEVNq9tutcj8V'
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
    clearState()
  }
  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        className='form-control'
                        placeholder='Name'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='description'
                    id='description'
                    className='form-control'
                    rows='4'
                    placeholder='Description'
                    required
                    vaue={description}
                    onChange={e => setDescription(e.target.value)}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                <div className='form-group'>
                      <input
                        type='text'
                        id='phone'
                        name='phone'
                        value={phone}
                        className='form-control'
                        placeholder='Whatsapp Number'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                    </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className="form-group" style={{fontSize:"100px"}}> 
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        minDate={new Date()}
                        style={{fontWeight:1000}}
                        className="form-control"
                        disableToolbar
                        variant="dialog"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </MuiPickersUtilsProvider>
                    </div>
                  
                    {/* {<div className='form-group'>
                      <input
                        type='text'
                        id='prefDate'
                        name='prefDate'
                        value={prefDate}
                        className='form-control'
                        placeholder='Preferrable Date (Format dd/mm/yyyy)'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>} */}
                  </div>
                  </div>
                  <div className="row">
                  <div className='col-md-12'>
                    {selectedDate && <p>Slots:</p>}
                      {selectedDate && slots.map(slot => 
                          <Button
                          variant="contained"
                          color={slot==prefTime?"primary":"default"}
                          style={{fontSize:20}}
                          onClick={(e) => {
                          e.preventDefault();
                          setState((prevState) => ({ ...prevState, prefTime: slot }))
                          
                      }}>{slot}</Button>)}
                    {/* {<div className='form-group'>
                      <input
                        type='text'
                        id='prefTime'
                        name='prefTime'
                        className='form-control'
                        placeholder='Preferrable Time (From 9 am to 8 pm)'
                        required
                        value={prefTime}
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>*/}
                  </div>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                    Book Appointment
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {data ? data.address : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {data ? <a href="tel:+919920739678" style={{color:"white"}}>9920739678</a> : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope'></i> Email
                </span>{' '}
                {data ? <a href="mailto:pediacareclinic.drpayal@gmail.com" style={{color:"white"}}>pediacareclinic.drpayal@gmail.com</a> : 'loading'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2021 Pedia Care Clinic.
          </p>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  uid : state.auth.uid,
  appointments: state.appoi.appointments
});

const mapDispatchToProps = (dispatch) => ({
  handlePatientApp: (data) => dispatch(handlePatientApp(data)),
  getAllAppointments: () => dispatch(getAllAppointments())
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);