import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { LinkedIn } from '../LinkedIn';

import { facebookID } from '../../lib/ID';
import Divider from '../../components/Divider.components';
import {
  login,
  facebookLogin,
  linkedInLogin,
  pwRequest,
} from '../../actions/auth.actions';

import facebook from '../../assets/Facebook.png';

import '../../styles/SignIn.css';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      loggingIn: false,
      errorMessage: '',
    };
  }

  enterEmail = evt =>
    this.setState({
      email: evt.target.value.toLowerCase(), // Make sure email entry is LOWERCASE, DB doesn't check case sensitive
      loggingIn: false,
    });

  enterErrorEmail = evt => {
    localStorage.removeItem('emailTaken');
    localStorage.removeItem('validEmail');
    localStorage.removeItem('login_error');

    this.setState({
      email: evt.target.value.toLowerCase(),
      loggingIn: false,
    });
  };

  enterUsername = evt =>
    this.setState({
      username: evt.target.value.toLowerCase(),
      loggingIn: false,
    });

  enterErrorUsername = evt => {
    localStorage.removeItem('usernameTaken');

    this.setState({
      username: evt.target.value.toLowerCase(),
      loggingIn: false,
    });
  };

  enterPassword = evt =>
    this.setState({
      password: evt.target.value,
      loggingIn: false,
    });

  enterErrorPassword = evt => {
    localStorage.removeItem('login_error');

    this.setState({
      password: evt.target.value,
      loggingIn: false,
    });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email.email).toLowerCase());
  };

  handleLogin = evt => {
    evt.preventDefault();

    let loginCreds = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      loggingIn: true,
    });

    this.props.login(loginCreds);
  };

  handlePasswordRecovery = evt => {
    evt.preventDefault();

    this.props.pwRequest(this.state.email);
  };

  loginFacebook = response => {
    this.props.facebookLogin(response.accessToken);

    this.setState({
      loggingIn: true,
    });
  };

  loginLinkedIn = response => {
    this.props.linkedInLogin(
      response.code,
      `${window.location.origin}/linkedin`
    );

    this.setState({
      loggingIn: true,
    });
  };

  handleLinkedInFail = error => console.log(error.errorMessage);

  componentWillMount() {
    localStorage.removeItem('emailTaken');
    localStorage.removeItem('validEmail');
    localStorage.removeItem('usernameTaken');
    localStorage.removeItem('login_error');
  }

  render() {
    let emailTaken = localStorage.getItem('emailTaken');
    let validEmail = localStorage.getItem('validEmail');
    let usernameTaken = localStorage.getItem('usernameTaken');
    let loggedIn = localStorage.getItem('loggedIn');
    let loginError = localStorage.getItem('login_error');

    const { code, errorMessage } = this.state;

    const SignIn = (
      <div id="SignIn">
        <div className="SignIn-Panel">
          <div className="SignIn-Header">
            <Link to="/">
              <div className="Left-Arrow">&#8592;</div>
            </Link>
            <h2>
              {this.props.location.hash ? 'Sign In To Post Jobs' : 'Sign In'}
            </h2>
          </div>

          <div className="Oauth-Icon">
            <LinkedIn
              clientId="780fvbi7hufn1p"
              state="eFWf45A53sdfKef424"
              onFailure={() => this.handleLinkedInFail()}
              onSuccess={code => this.loginLinkedIn(code)}
              redirectUri={`${window.location.origin}/linkedin`}
            />

            <FacebookLogin
              appId={facebookID}
              version="3.1"
              autoLoad={false}
              fields="name,email,picture"
              callback={() => this.loginFacebook()}
              render={renderProps => (
                <div className="Facebook-btn" onClick={renderProps.onClick}>
                  <img
                    src={facebook}
                    alt="Facebook Login"
                    aria-label="Login with Facebook"
                  />
                </div>
              )}
            />
          </div>

          <Divider />

          <div className="Login-Form">
            {this.state.loggingIn && !localStorage.login_error ? (
              <div id="load-login">
                <p>
                  Logging you in<span>.</span>
                  <span>.</span>
                  <span>.</span>
                </p>
              </div>
            ) : null}

            <form className="input-form" onSubmit={this.login}>
              <div className="SignIn-Inputs">
                {loginError ? (
                  <div className="register-error">
                    Whoops, wrong password or email
                  </div>
                ) : null}

                <input
                  autoFocus={loginError ? false : true}
                  type="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Enter Email"
                  defaultValue={this.state.email}
                  onChange={e =>
                    loginError ? this.enterErrorEmail() : this.enterEmail(e)
                  }
                />

                <input
                  type="password"
                  id="password"
                  autoComplete="password"
                  placeholder="Enter Password"
                  defaultValue={this.state.password}
                  onChange={e =>
                    loginError
                      ? this.enterErrorPassword()
                      : this.enterPassword(e)
                  }
                />
              </div>

              <div className="SignIn-Input-Buttons">
                <button
                  className={
                    this.state.password.length >= 3
                      ? 'Ready-Landing-btn'
                      : 'Landing-btn'
                  }
                  type="submit"
                  onClick={e => this.handleLogin(e)}
                  aria-label="Login"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>

          <Divider />

          <div className="SignIn-Registration-Links">
            <Link to="/password" className="SignIn-Link-Button">
              <h2>Forgot Password?</h2>
            </Link>
          </div>

          <Divider />

          <div className="SignIn-Registration-Links">
            <Link to="/user_registration" className="SignIn-Link-Button">
              <h2>Or Create New Account</h2>
            </Link>
          </div>

          <div id="Terms-And-Conditions">
            <p>
              By clicking Continue, you agree to our{' '}
              <b>
                <Link to="/terms">Terms of Service</Link>
              </b>{' '}
              and{' '}
              <b>
                <Link to="/privacy">Privacy Policy.</Link>
              </b>
            </p>
          </div>
        </div>
      </div>
    );

    return loggedIn ? <Redirect to={'/feed'} /> : SignIn;
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { login, facebookLogin, linkedInLogin, pwRequest }
)(SignIn);
