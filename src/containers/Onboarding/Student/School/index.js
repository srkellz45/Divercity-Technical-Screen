import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../../actions/user.actions';
import { addSchool } from '../../../../actions/onboard.actions';
import TempHeader from '../../../../components/TempHeader.js';
//import Dropdown from '../../../../components/Dropdown.js';
import SchoolSearch from '../../SchoolSearch';
import MajorSearch from '../../MajorSearch';

import student from '../../../../assets/StudentSchool.png';

// {url}/:id/onboarding/school

class StudentSchool extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      school_id: '',
      major_id: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSchool = this.setSchool.bind(this);
    this.setMajor = this.setMajor.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
    this.props.getUser(this.state.id);

  }
  handleSubmit(evt) {
    evt.preventDefault();
    let profileData = { "user": { } };
    if(this.state.school_id) {
      Object.assign(profileData.user, {school_id: this.state.school_id});
    }
    this.props.addSchool(profileData, this.state.id, this.state.major_id);
  }
  setSchool(data) {
    this.setState({
      school_id: data.id
    });
  }
  setMajor(data) {
    console.log(data);
    this.setState({
      major_id: data.id
    });
  }

  render() {
    return (
      <div className="CurrentCompany">
        <TempHeader />
        <div className="onboarding-select-form">
          <div className="work-select-body">
            <div className="onboarding-select-headline">
              Where do go to school?<br />
              <div id="onboarding-select-subline">
                Let us know where and what you study.
              </div>
            </div>
            <div className="onboarding-select-image">
              <img src={ student } alt="onboarding" />
            </div>
            <div id="onboarding-select-title">
              School
            </div>
            <div className="CompanySearch">
              <SchoolSearch
                setState={this.setSchool}
              />
            </div>
            <div id="onboarding-select-title">
              Major
            </div>
            <div className="CompanySearch">
              <MajorSearch
                setState={this.setMajor}
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
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/resume/3`} alt="Back">
                Back
              </NavLink>
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
    occupations : state.occupationsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    addSchool: (data, ID, majorID) => {
      dispatch(addSchool(data, ID, majorID))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSchool);

