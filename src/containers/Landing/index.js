import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import "../../styles/Landing.css";

import logo from '../../assets/Logo.png';
import opportunities from '../../assets/SeekingOpportunities.png';
import looking from '../../assets/LookingRecruit.png';
import apple from '../../assets/app-store-badge.png';
import google from '../../assets/google-play-badge.png';

const Landing = () => {
	let loggedIn = localStorage.getItem('loggedIn');

	const Landing = (
		<div id="Landing">
			<div className="Landing-Panel">
				<div className="Landing-Headline">
					<img src={logo} alt="logo" />
					<h2>The World’s Largest Minority Professional Network</h2>
				</div>

				<div className="Landing-Body">
					<div className="Landing-Body-Left-Panel">
						<div className="Landing-Body-Header">
							<img src={opportunities} alt="Seeking"/>
							<h3>Professional? Job Seeker? Student?</h3>
						</div>

						<ul className="Landing-Body-List">
							<li>Download our app for access to exclusive jobs</li>
							<li>Join groups tailored to your interests</li>
							<li>Connect with talented folks like yourself</li>
							<li>Get the latest scoop on the world of diversity</li>
						</ul>

						<div className="Mobile-Link">
							<h4>Download the mobile app</h4>

							<div className="Mobile-Link-Buttons">
								<a href="https://itunes.apple.com/us/app/pinc-chat/id1082955432"><img className="Apple-Button" src={apple} alt="apple-button" /></a>
								<a href="https://play.google.com/store/apps/details?id=com.divercity.android"><img className="Apple-Button" src={google} alt="google-button" /></a>
							</div>

							<Link to="/signin"><button className="SignIn-Link-Button">Or Continue By Signing In</button></Link>
						</div>
					</div>

					<div className="Landing-Body-Divider">
						<hr/>
					</div>

					<div className="Landing-Body-Right-Panel">
						<div className="Landing-Body-Header">
							<img src={looking} alt="Looking"/>
							<h3>Company? Recruiter? Hiring Manager?</h3>
						</div>

						<ul className="Landing-Body-List">
							<li>Post Jobs and let our AI do the rest</li>
							<li>Access thousands of diverse candidates</li>
							<li>Allow us to find the right talent for you</li>
							<li>Access our Diversity Rating feature</li>
						</ul>

						<div className="Landing-Body-Buttons">
							<Link to={{
								pathname: "/signin",
								hash: "#postJob"
							}}>Post Jobs</Link>
							<Link to="/staffing">Use our Staffing Team</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

    return loggedIn ? <Redirect to={'/feed'}/> : Landing;
}

export default Landing;