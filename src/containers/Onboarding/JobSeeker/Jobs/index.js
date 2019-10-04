import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../../../actions/user.actions';
import { updateProfile } from '../../../../actions/onboard.actions';
import TempHeader from '../../../../components/TempHeader.js';
import Dropdown from '../../../../components/Dropdown.js';
import CitySearch from '../../CitySearch';
import jobImage from '../../../../assets/JobSeeker.png';
import { occupationList } from '../../../../lib/selectListData';

// /onboarding/jobs/3

class JobSeekerJobs extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      occupationItems: occupationList,
      occupation: null,
      city: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setOccupation = this.setOccupation.bind(this);
  }

  handleChange(title, something, emoji, id, key) {
    let titleString = JSON.parse(JSON.stringify(title));
    this.setState({
      [key] : titleString
    });
  }
  componentDidMount(){
    this.props.getUser(this.state.id);
    window.scrollTo(0,0);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let profileData = { "user": { } };
    if(this.state.occupation) {
      Object.assign(profileData.user, {occupation: this.state.occupation});
    }
    if(this.state.city) {
      Object.assign(profileData.user, {city: this.state.city});
    }
    this.props.updateProfile(profileData, this.state.id);

    this.setState({
      occupation: '',
      city: '',
    });
  }
  setCity(data) {
    this.setState({
      city: data.attributes.name + ', ' + data.attributes.country_name
    });
  }
  setOccupation(data) {
    this.setState({
      occupation: data.attributes.id
    });
  }
  render() {
    return (
      <div className="JobSeeker">
        <TempHeader />
        <div className="onboarding-select-form">
          <div className="onboarding-select-body">
            <div className="onboarding-select-headline">
              What jobs are you looking for?<br />
              <div id="onboarding-select-subline">
                Let us know where to look for your dream job.
              </div>
            </div>
            <div className="onboarding-select-image">
              <img src={ jobImage } alt="job-seeker" />
            </div>
            <div id="onboarding-select-title">
              Job title
            </div>
            <div className="IndustrySearch">
              <Dropdown
              title="e.g. Accountant"
              list={this.state.occupationItems}
              setState={this.handleChange}
            />
            </div>
            <div id="onboarding-select-title">
              Location
            </div>
            <div className="CitySearch">
              <CitySearch
                setState={this.setCity}
              />
            </div>
            <button
              aria-label="Next"
              className="onboarding-next-btn"
              type="submit"
              onClick={this.handleSubmit}>
              <strong>Next</strong>
            </button>
          </div>
        </div>
        <div className="progress-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="greydot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user : state.userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    updateProfile: (data, ID) => {
      dispatch(updateProfile(data, ID))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSeekerJobs);

      // <div className="Skip">
      //   <NavLink to="/jobs" alt="skip">
      //     Skip and edit info later
      //   </NavLink>
      // </div>