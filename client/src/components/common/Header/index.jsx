import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {
  const [showMobileNavbar, setMobileNavbarDisplay] = useState(false);
  return (
    <header className="header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Main Logo" decoding="async" loading="lazy" importance="high" />
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
            <NavLink to="/login" className="navbar-item">
              <span className="button is-light">
                Login
              </span>
            </NavLink>
            <NavLink to="/events" className="navbar-item">
              Events
            </NavLink>
            <NavLink to="/bookings" className="navbar-item">
              Bookings
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;
