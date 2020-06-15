import React, { Fragment, Component } from 'react';

import AppHeader from './components/common/Header';
import AppFooter from './components/common/Footer';
import Routes from './routes';

import { AuthContext } from './context'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(token, userId, tokenExpiration) {
    this.setState({
      token,
      userId,
      tokenExpiration,
    });
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('userId', userId);
    localStorage.setItem('tokenExpiration', tokenExpiration);
  }

  logout() {
    this.setState({
      token: null,
      userId: null,
      tokenExpiration: null,
    });
    localStorage.removeItem('token')
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
  }

  getToken = () => localStorage.getItem('token');

  getUserId = () => localStorage.getItem('userId');

  render() {
    return (
      <Fragment>
        <AuthContext.Provider value={{ token: this.getToken(), userId: this.getUserId(), login: this.login, logout: this.logout }}>
          <AppHeader />
            <main className="container mt-6">
              <Routes />
            </main>
          <AppFooter />
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export default App;
