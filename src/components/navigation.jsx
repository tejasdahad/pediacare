import { connect } from "react-redux"
import { startLogout } from "../actions/auth"
import { Link } from 'react-router-dom'
import { Fragment, useEffect, useState } from "react";
const Navigation = (props) => {
  const [f,setF] = useState(false);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if(window.location.pathname==='/home'){
      setF(false);
    }else{
      setF(true);
    }
    if(window.location.pathname==='/'){
      setAuth(false);
    }else{
      setAuth(true);
    }
  },[window.location]);
  
  return (
    (auth && <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            Pedia Care Clinic
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            {!f && <Fragment><li>
              <a href='#features' className='page-scroll'>
                Features
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            <li>
              <a href='#services' className='page-scroll'>
                Services
              </a>
            </li>
            {/* {<li>
              <a href='#portfolio' className='page-scroll'>
                Gallery
              </a>
            </li>} */}
            <li>
              <a href='#contact' className='page-scroll'>
                Contact
              </a>
            </li></Fragment>}
            {f && <li>
                <a href='/home' className="page-scroll">
                  Home
                </a>
              </li>}
            <li>
              <a href="/appointments" className='page-scroll'>
                My Appointments
              </a>
            </li>
            <li>
              <a className='page-scroll' onClick={() => {props.startLogout();window.location.reload()}}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>)
  )
}


const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);