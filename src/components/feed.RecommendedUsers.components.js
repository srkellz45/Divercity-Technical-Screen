import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {removeRecommendedUser} from '../actions/recommendedUsers.actions';

class RecommendedUsers extends Component {
	handleSelectedRecommendedUser = id => {
		this.props.removeRecommendedUser(id);
	}

	render() {
		var { image, name, type, title, company, id, connect, connected } = this.props;
		let addDefaultSrc = evt => evt.target.src = 'https://s3-us-west-2.amazonaws.com/pinc-backend/images/cdn/avatars/Profile1.png';

		return (
			<div className="Recommended-user-grid" key={id}>
				<div className="Remove-recommended-user" onClick={() => this.handleSelectedRecommendedUser(id)}>
					<p>&#10006;</p>
				</div>

				<NavLink to={`users/${id}/`}>
					<div className="Recommended-user-image">
						<img src={ image } onError={ addDefaultSrc } alt="Recommended Connection Image" />
					</div>

					<div className="Recommended-name">
						{ name }
					</div>
				</NavLink>

				{ type === 'job_seeker' ? ( <div className="Recommended-type">Job Seeker</div> ) : (null) }
				{ type === 'professional' ? ( <div className="Recommended-type">Professional</div> ) : (null) }
				{ type === 'recruiter' ? ( <div className="Recommended-type">Recruiter</div> ) : (null) }
				{ type === 'hiring_manager' ? ( <div className="Recommended-type">Hiring Manager</div> ) : (null) }
				{ type === 'student' ? ( <div className="Recommended-type">Student</div> ) : (null) }
				{ type === 'entrepreneur' ? ( <div className="Recommended-type">Entrepreneur</div> ) : (null) }

				<div id="Recommended-user">
					<div id="Recommended-company">
						{!title ? ( null ) : (
							<div>
								{ title.length < 40 ? // basically if the job title is too long, cut it off based on string length
								( <div> { title } </div> ) :  (title.substring(0, 40) + '...') } { company.name ? ( 'at' ) : ( null ) } { company.name }
							</div>
						)}
					</div>
				</div>

				<div id="Recommended-User-Buttons">
					{ !connected ? (
						<button
						id={ id }
						onClick={ connect }
						className="recommended-user-btn"
						>
						connect
						</button>
						) : (
						<button id={ id }
						className="recommended-btn-connected">
						<span>Connected</span>
						</button>
					)}

					<NavLink to={`/users/${localStorage.id}/chats/${id}`} >
						<div className="recommended-user-btn" style={{paddingTop: "7px", textAlign:"center"}} >direct message</div>
					</NavLink>
				</div>
			</div>
		);
	}
}

var mapStateToProps = state => state;

export default connect(mapStateToProps, {removeRecommendedUser})(RecommendedUsers);