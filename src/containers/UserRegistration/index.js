import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ToastContainer, Flip, toast } from "react-toastify";
import { LinkedIn } from '../LinkedIn';
import { facebookID } from '../../lib/ID';
import Divider from '../../components/Divider.components';
import { login, checkRegister, facebookRegister, linkedInRegister, pwRequest } from '../../actions/auth.actions';

import facebook from '../../assets/Facebook.png';

import "../../styles/UserRegistration.css";

class UserRegistration extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			password: "",
			loggingIn: false,
			email: ""
		}
	}

	registerFacebook = response => {
		this.props.facebookRegister(response.accessToken);

		this.setState({
			loggingIn: true
		});
	}

	responseLinkedin = response => {
		this.props.linkedInRegister(response.code, `${window.location.origin}/linkedin`);

		this.setState({
			loggingIn: true
		});
	}

	handleLinkedInFail = error => console.log(error.errorMessage);

	handleRegister = evt => {
		evt.preventDefault();

		let email = {
			email : this.state.email,
		};

		let username = {
			username: this.state.username
		};

		let registerCreds = {
			name: this.state.name,
			email : this.state.email,
			password : this.state.password
		};

		// uses REGEX to check email format
		localStorage.setItem('validEmail', this.validateEmail(email) ? true : false);

		this.setState({
			loggingIn: true
		});

		let validName = this.validateName(this.state.name);

		if(validName && this.state.password.length >= 8 ) {
			this.props.checkRegister(email, username, registerCreds);
		} else if (this.state.password.length < 8 ){
			toast.error(`Please create a password that is at least 8 characters long`, {
				position: toast.POSITION.TOP_CENTER,
				hideProgressBar: true,
			});

			this.setState({
				loggingIn: false
			});
		}

		// sends to Auth.ACTION to check if email && username is taken
		// if they aren't taken, it registers
		// if they are taken, it returns error
	}

	enterErrorEmail = evt => {
		localStorage.removeItem('emailTaken');
		localStorage.removeItem('validEmail');
		localStorage.removeItem('login_error');

		this.setState({
			email: evt.target.value.toLowerCase(),
			loggingIn: false
		});
	}

	enterEmail = evt => {
		this.setState({ 
			email: evt.target.value.toLowerCase(),
			loggingIn: false
		});
	}

	validateName = name => (/^[a-zA-Z ]+$/.test(String(name)));

	enterName = evt => {
		this.setState({
			name: evt.target.value,
			loggingIn: false
		});
	}

	enterPassword = evt => {
		this.setState({
			password: evt.target.value,
			loggingIn: false
		});
	}

	componentWillMount = () => {
		localStorage.removeItem('emailTaken');
		localStorage.removeItem('alreadySocial');
		localStorage.removeItem('validEmail');
	}

	render() {
		let emailTaken = localStorage.getItem('emailTaken');
		let validEmail = localStorage.getItem('validEmail');
		let loggedIn = localStorage.getItem('loggedIn');

		const UserRegistration = (
			<div id="UserRegistration">
				<div className="UserRegistration-Panel">
					<div className="UserRegistration-Header">
						<Link to="/"><div className="Left-Arrow">&#8592;</div></Link>
						<h2>Registration</h2>
					</div>

					<div className="Oauth-Icon">
						<LinkedIn
							clientId="780fvbi7hufn1p"
							state="eFWf45A53sdfKef424"
							onFailure={() => this.handleLinkedInFail()}
							onSuccess={() => this.responseLinkedin()}
							redirectUri={`${window.location.origin}/linkedin`}
						/>

						<FacebookLogin
							appId={ facebookID }
							version="3.1"
							autoLoad={false}
							fields="name,email,picture"
							callback={() => this.registerFacebook()}
							render={renderProps => (
								<div className="Facebook-btn" onClick={renderProps.onClick}>
									<img src={ facebook } alt="Facebook Login" aria-label="Login with Facebook"/>
								</div>
							)}
						/>
					</div>

					<Divider/>

					<div className="Registration-Form">
						{ this.state.loggingIn && !localStorage.emailTaken ? (
							<div id="load-login">
								<p>Signing In<span>.</span><span>.</span><span>.</span></p>
							</div>
						) : null }

						<form onSubmit={this.handleRegister}>
							{ 'localStorage.alreadySocial' === 'yes' ? (
								<div className="social-register-error">
									This email is already signed up via a Social Media Login. <br />
									<a style={{color: '#3198E5', cursor: 'pointer'}} onClick={() => this.toggleSignin()}>Please sign in </a>with the method you used previously (LinkedIn or Facebook) and set a password on the Settings page.
								</div> ) : (null) 
							}

							{ validEmail === 'false' ? (
								<div className="register-error">Enter valid email<br /></div>) : (null) }

							{ emailTaken ? (
								<div className="register-error">
									That email is already Registered<br />
									<Link to="/signin">
										<div>Want to Log In?</div>
									</Link>
								</div>
							) : (null) }

							<input
								type="email"
								id="email"
								autoComplete="email"
								placeholder="Enter Email"
								defaultValue={this.state.email}
								onChange={e => ( emailTaken ? this.enterErrorEmail() : this.enterEmail(e))}
							/>

							{ this.state.name && this.validateName(this.state.name) === false ? (
								<div className="register-error">Enter valid name without special characters or numbers<br /></div>
								) : (null) }

							<input
								type="name"
								id="name"
								autoComplete="name"
								placeholder="Full Name"
								defaultValue={this.state.name}
								onChange={e => this.enterName(e)}
							/>

							<input
								type="password"
								id="password"
								autoComplete="password"
								placeholder="Password"
								defaultValue={this.state.password}
								onChange={e => this.enterPassword(e)}
							/>

							<button
								className={ (this.state.password.length >= 3) ? "Ready-Landing-btn" : "Landing-btn"}
								type="submit"
								onClick={e => this.handleRegister(e)}
								aria-label="Register"
							>Sign Up</button>
						</form>

						<div id="Terms-And-Conditions">
							<p>By clicking Continue, you agree to our <b><Link to="/terms">Terms of Service</Link></b> and <b><Link to="/privacy">Privacy Policy.</Link></b></p>
						</div>
					</div>
				</div>
			</div>
		);

		return loggedIn ? <Redirect to={'/feed'}/> : UserRegistration;
	}
}

const mapStateToProps = state => {
	return {
		usernameError : state.checkUsername,
		emailError : state.checkEmail
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkRegister: (em, us, rc) => {
			dispatch(checkRegister(em, us, rc));
		},
		login: (creds) => {
			dispatch(login(creds));
		},
		facebookRegister: (token) => {
			dispatch(facebookRegister(token));
		},
		linkedInRegister: (token, state) => {
			dispatch(linkedInRegister(token, state));
		},
		pwRequest: (email) => {
			dispatch(pwRequest(email));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);