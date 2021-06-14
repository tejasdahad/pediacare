import React,{ useState } from 'react'
import emailjs from 'emailjs-com'
import { connect } from 'react-redux';
import { handlePatientApp } from '../actions/appointment';

const initialState = {
  name: '',
  email: '',
  description: '',
  prefDate:'',
  prefTime:''
}
const Contact = ({data, handlePatientApp}) => {
  const [{ name, email, description, prefDate, prefTime }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data1 ={
      name, email, description, prefDate, prefTime, alloDate:'', alloTime:'', meetingLink:''
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
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
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
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
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
                    </div>
                  </div>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Request
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
                {data ? data.phone : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {data ? data.email : 'loading'}
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href={data ? data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href={data ? data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href={data ? data.youtube : '/'}>
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2020 Issaaf Kattan React Land Page Template. Design by{' '}
            <a href='http://www.templatewire.com' rel='nofollow'>
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
  handlePatientApp: (data) => dispatch(handlePatientApp(data))
});

export default connect(undefined, mapDispatchToProps)(Contact);