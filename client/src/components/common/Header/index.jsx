import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context';
import Logo from '../../../assets/images/icons/main-logo.png';

import './header.css';

const Header = () => {
  const [showMobileNavbar, setMobileNavbarDisplay] = useState(false);
  return (
    <AuthContext.Consumer>
      {(context) => 
        <header className="header">
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <NavLink to="/" className="navbar-item">
                <img src={Logo} alt="Main Logo" decoding="async" loading="lazy" importance="high" />
              </NavLink>

              <span role="button" className={'navbar-burger burger ' + (showMobileNavbar ? 'is-active': '')}
              aria-label="menu" aria-expanded="false" data-target="main-navbar" onClick={() => setMobileNavbarDisplay(!showMobileNavbar)}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </span>
            </div>

            <div id="main-navbar" className={'navbar-menu ' + (showMobileNavbar ? 'is-active': '')}>
              <div className="navbar-start"></div>
              <div className="navbar-end">
                {
                  !context.token && 
                  <NavLink to="/login" className="navbar-item">
                    <span className="button is-light is-info">
                      Login
                    </span>
                  </NavLink> 
                }
                <NavLink to="/events" className="navbar-item">
                  Events
                </NavLink>
                {
                  context.token && 
                  (
                    <Fragment>
                      <NavLink to="/bookings" className="navbar-item">
                        Bookings
                      </NavLink>
                      <div className="navbar-item" onClick={context.logout}>
                        <span className="button is-light is-danger">
                          Logout
                        </span>
                      </div>
                    </Fragment>
                  )
                }
              </div>
            </div>
          </nav>
        </header>
      }      
    </AuthContext.Consumer>
  )
}

export default Header;
