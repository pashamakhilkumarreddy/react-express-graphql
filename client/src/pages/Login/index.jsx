import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

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
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }`
      };
      const result = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (result.status !== 200 || result.status !== 201) {
        return;
      }
      const formattedResult = await result.json();
      console.log(formattedResult);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-10-mobile is-8-tablet is-8-desktop is-half-widescreen is-7-fullhd">
          <form className="auth-form" onSubmit={this.handleOnSubmit} autoComplete="off">
            <h1 className="title has-text-weight-bold has-text-centered">Login</h1>
            <div className="field">
              <label htmlFor="login-email" className="label">Email</label>
              <div className="control">
                <input type="text" id="login-email" className="input" name="email" value={this.state.email} placeholder="Please enter your email"
                onChange={this.handleOnChange} required/>
              </div>
            </div>
            <div className="field">
              <label htmlFor="login-password" className="label">Password</label>
              <div className="control">
                <input type="password" id="login-password" className="input" name="password" value={this.state.password} placeholder="Please enter your password"
                onChange={this.handleOnChange} required/>
              </div>
            </div>
            <div className="field is-grouped">
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
    )
  }
}