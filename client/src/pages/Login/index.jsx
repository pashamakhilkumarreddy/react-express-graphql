import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AuthContext } from '../../context';
import { baseURL } from '../../utils';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  static contextType = AuthContext;

  handleOnChange = (e) => {
    const { value, name } = e.target;
    if (value.trim()) {
      this.setState({
        [name]: value,
      });
    }
  }

  handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        email,
        password
      } = this.state;
      if (!email.trim() || !password.trim()) {
        return;
      }
      const requestBody = {
        query: `
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }`,
          variables: {
            email,
            password,
          }
      };
      const result = await fetch(`${baseURL}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (result.status === 200) {
        const formattedResult = await result.json();
        const { token, userId, tokenExpiration, } = formattedResult.data.login;
        if (token && userId && tokenExpiration) {
          this.context.login(token, userId, tokenExpiration);
          this.props.history.push('/events');
          window.location.reload();
        }
      }
      return;
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="columns is-centered is-vcentered is-mobile">
          <div className="column is-10-mobile is-8-tablet is-8-desktop is-half-widescreen is-7-fullhd">
            <form className="form" onSubmit={this.handleOnSubmit} autoComplete="off">
              <h1 className="title has-text-weight-bold has-text-centered">Login</h1>
              <div className="field">
                <label htmlFor="login-email" className="label">Email</label>
                <div className="control">
                  <input type="text" id="login-email" className="input" name="email" value={this.state.email}
                    placeholder="Please enter your email" onChange={this.handleOnChange} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="login-password" className="label">Password</label>
                <div className="control">
                  <input type="password" id="login-password" className="input" name="password"
                    value={this.state.password} placeholder="Please enter your password" onChange={this.handleOnChange}
                    required />
                </div>
              </div>
              <div className="field is-grouped mt-5">
                <div className="control">
                  <button className="button is-link">Login</button>
                </div>
                <div className="control is-flex is-v-centered">
                  <span className="has-text-weight-bold">New here?&nbsp;&nbsp;&nbsp;</span>
                  <Link to="/signup" className="button is-link is-light">SignUp</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}