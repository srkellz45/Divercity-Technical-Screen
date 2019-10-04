import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pwRequest } from '../../actions/auth.actions';
import { ToastContainer, Flip } from 'react-toastify';
import logo from '../../assets/Logo.png';

import '../../styles/PasswordReset.css';


// Initialize state of component
class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      invalidEmail: false,
    };
  }

  // Get email from user input
  enterEmail = evt => {
    this.setState({
      email: evt.target.value,
    });
  };

  // If the email is vaild, invoke password request function
  handlePasswordReset = async evt => {
    evt.preventDefault();
    let email = this.state.email;
    if (this.validateEmail(email)) {
      this.props.pwRequest(email);
    } else {
      this.setState({
        invalidEmail: true,
      });
    }
  };
  

  // Validate that the email entered is in the correct format
  validateEmail = email => {
    console.log(email);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  };


  // Render the component template
  render() {
    let { invalidEmail } = this.state;
    const PasswordReset = (
      <div id="PasswordReset">
        <div className="Password-Recovery-Panel">
          <ToastContainer
            autoClose={10000}
            transition={Flip}
            hideProgressBar={true}
          />
          <div className="Password-Recovery-Header">
            <Link to="/">
              <div className="Left-Arrow">&#8592;</div>
            </Link>
            <h2>Retrieve Password</h2>
          </div>

          <div className="Password-Recovery-form">
            <div className="Register-headline">
              <img src={logo} alt="logo" />
            </div>

            <h4>
              Enter your email address and we will send you a link to reset your
              password
            </h4>

            <form onSubmit={this.handlePasswordReset}>
              {invalidEmail && (
                <div className="register-error">
                  Enter a valid email
                  <br />
                </div>
              )}

              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Enter Email"
                defaultValue={this.state.email}
                onChange={this.enterEmail.bind(this)}
              />

              <button
                className="Ready-Landing-btn"
                type="submit"
                onClick={this.handlePasswordReset}
                aria-label="Password Recovery"
              >
                Send password reset email
              </button>
            </form>
          </div>
          <div id="Terms-And-Conditions"></div>
        </div>
      </div>
    );
    return PasswordReset;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pwRequest: email => {
      dispatch(pwRequest(email));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PasswordReset);
