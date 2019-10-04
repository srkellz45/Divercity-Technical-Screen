import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/user.actions';
import { updateProfile } from '../../../actions/onboard.actions';
import { followOccupation } from '../../../actions/occupation_interests.actions';
import TempHeader from '../../../components/TempHeader.js';
import Dropdown from '../../../components/Dropdown.js';
import OccupationSearch from '../OccupationSearch';
import CitySearch from '../CitySearch';
import jobImage from '../../../assets/JobSeeker.png';
import { ToastContainer, Flip, toast } from "react-toastify";
// /onboarding/js

class JobSeeker extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      occupation: null,
      city: null,
      occupationID: ''
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
    let occupationData = { "occupation_ids": { } };
    if(this.state.occupation) {
      Object.assign(occupationData, {occupation_ids: this.state.occupationID});
    }
    if(this.state.city) {
      Object.assign(profileData.user, {city: this.state.city});
    }
    if(this.state.city && this.state.occupation) {
        this.props.updateProfile(profileData, this.state.id);
        this.props.followOccupation(occupationData);
        this.setState({
          occupation: '',
          city: '',
        });
    } else {
      toast.error(`Please fill out both items, you can always change them later in your profile`, {
        position: toast.POSITION.TOP_CENTER
      });
    }

  }
  setCity(data) {
    this.setState({
      city: data.attributes.name + ', ' + data.attributes.country_name
    });
  }
  setOccupation(data) {
    console.log(data);
    this.setState({
      occupation: data.attributes.name,
      occupationID: data.id
    });
  }
  render() {
    return (
      <div className="JobSeeker">
      <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
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
              Career Interests
            </div>
            <div className="IndustrySearch">
              <OccupationSearch
                setState={this.setOccupation}
                defaultvalue="e.g. Accountant"
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
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/resume/3`} alt="Back">
                Back
              </NavLink>
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
    followOccupation: (data) => {
      dispatch(followOccupation(data))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobSeeker);

