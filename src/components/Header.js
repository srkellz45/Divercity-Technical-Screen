import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Search from '../containers/Search';
import Add from '../containers/Add';
import Notifications from './header.notifications.components.js';
import { getUnreadActivities, markReadActivities, getActivities } from '../actions/notification.actions';
import { ToastContainer, Flip } from "react-toastify";
import logo from '../assets/headericons/Logo_svg.svg';
import Inbox from '../assets/headericons/inbox.svg';
import Home from '../assets/headericons/home.svg';
import Groups from '../assets/headericons/Groups_Icon.svg';
import Jobs from '../assets/headericons/briefcase.svg';
import Bell from '../assets/headericons/bell.svg';
import Group from '../assets/Group.png';
import Notification from '../assets/icons/NotificationOval.png';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showUserDropdown: false,
			notifications: props.notificationsList,
			notificationIDs: []
		};
	}

	componentDidMount() {
		window.scrollTo(0,0);
		this.props.getUnreadActivities();
		this.props.getActivities();
	}

	showUserDropdown = evt => {
		evt.preventDefault();

		let unReads = this.props.notifications.map(notification => notification.id);

		this.setState({
			showUserDropdown: true
		}, () => document.addEventListener('click', this.closeUserDropdown));

		this.props.markReadActivities(JSON.stringify(unReads));
	}

	closeUserDropdown = () => this.setState({
		showUserDropdown: false
	}, () => document.removeEventListener('click', this.closeUserDropdown));

	componentWillUnmount() {
		document.removeEventListener('click', this.closeUserDropdown);
	}

	render() {
		return (
			<div className="Register-Header">
				<ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />

				<div className="Register-items">
					<NavLink to="/feed" id="header-links">
						<img id="header-logo" src={logo} alt="logo" />
					</NavLink>

					<Search />

					<NavLink to="/messages" id="header-links">
						<img id="header-icon" src={Inbox} alt="Inbox" />
						<div id="header-label">Inbox</div>
					</NavLink>

					<NavLink to="/feed" id="header-links">
						<img id="header-icon"
							style={{ minHeight: '30px', marginTop: '10px' }}
							src={Home} alt="Home"
						/>

						<div id="header-label">Home</div>
					</NavLink>

					<NavLink to="/people" id="header-links">
						<img id="header-icon" src={Groups} alt="People" />
						<div id="header-label">People</div>
					</NavLink>

					<NavLink to="/jobs" id="header-links">
						<img id="header-icon" src={Jobs} alt="Jobs" />
						<div id="header-label">Jobs</div>
					</NavLink>

					<div onClick={this.showUserDropdown} style={{marginTop: "-12px"}}>
						<img id="header-icon" src={Bell} alt="Notifications" />

						<div id="header-label-activity">Activity</div>

						{ this.props.notifications.length > 0 ? (
							<React.Fragment>
								<img id="notification-icon" src={Notification} alt="New Notifications" />

								<div id="notification-number">{ this.props.notifications.length }</div>
							</React.Fragment>
						) : null }

						{ this.state.showUserDropdown ?
							this.props.notifications.length > 0 ? (
								<div className="dropdown-menu" ref={element => { this.dropdownMenu = element; }} >
									{ this.props.notifications.map(notification => {
										let data = notification.attributes;

										return (
											<Notifications
												data={data}
												key={notification.id}
											/>
										)
									})}

									<div>
										<NavLink to="/notifications">
											<button className="Notification-btn">View All Notifications</button>
										</NavLink>
									</div>
								</div>
							) : ( // if the notifications are already viewed
								<div className="dropdown-menu" ref={element => { this.dropdownMenu = element; }} >
									<div id="No-New-Notifications"> No New Notifications </div>

									<br />

									<div id="notification-link">
										<NavLink to="/notifications">View All Notifications</NavLink>
									</div>

									{ this.props.allNotifications.map(allNotify => {
										let data = allNotify.attributes;

										return (
											<Notifications
												data={data}
												key={allNotify.id}
											/>
										)
									})}
								</div>
							) : null }
					</div>

					<NavLink to={`/${localStorage.id}/user/`} id="header-menu-links">
						<img id="header-image" src={ !localStorage.image ? Group : localStorage.image } alt="User" />
					</NavLink>

					<Add />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	notifications : state.notificationsList,
	allNotifications: state.allNotificationsList
})

export default connect(mapStateToProps, {getUnreadActivities, getActivities, markReadActivities})(Header);