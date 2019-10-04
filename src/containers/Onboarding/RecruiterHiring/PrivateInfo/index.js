import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../../actions/user.actions';
import { updateProfile } from '../../../../actions/onboard.actions';
import TempHeader from '../../../../components/TempHeader.js';
import Dropdown from '../../../../components/Dropdown.js';
import history from '../../../../history';
import Modal from '../../../Modal';

import {
  genderList,
  ethnicityList } from '../../../../lib/selectListData';

import knowMore from '../../../../assets/KnowMore.png';
//import company from '../../../../assets/CurrentCompany.png';
//import check from '../../../../assets/Checkmark.png';
import decline from '../../../../assets/Decline.png';
// url/:id/onboarding/info/2

class RecruiterInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      genderItems: genderList,
      ethnicityItems: ethnicityList,
      gender: null,
      ethnicity: null,
      user: [],
      files: [],
      skipOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openSkipModal = this.openSkipModal.bind(this);
    this.closeSkipModal = this.closeSkipModal.bind(this);
    this.skipFirstTime = this.skipFirstTime.bind(this);
  }

  handleChange(title, id, emoji, idk, key) {
    let titleString = JSON.parse(JSON.stringify(title));
    this.setState({
      [key] : titleString
    });
  }
  componentDidMount(){
    window.scrollTo(0,0);
    this.props.getUser(this.state.id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let profileData = { "user": { } };
    if(this.state.gender) {
      Object.assign(profileData.user, {gender: this.state.gender});
    }
    if(this.state.ethnicity) {
      Object.assign(profileData.user, {ethnicity: this.state.ethnicity});
    }

    this.props.updateProfile(profileData, localStorage.id);

    this.setState({
      gender: '',
      ethnicity: '',
    });
  }
  openSkipModal (evt) {
    if(!localStorage.skipped) { // if user has already skipped once,
      this.setState({ // just let them skip without showing the modal
        skipOpen: true,
      });
    } else {
      history.push(`/${this.state.id}/onboarding/groups/`);
    }
  }
  closeSkipModal () {
    this.setState({
      skipOpen: false,
    });
  }
  skipFirstTime () { // Show the skip modal only once
    localStorage.setItem('skipped', true);
    this.setState({
      skipOpen: false
    });
  }

  render() {
    let ok = "'"; // just allows me to use a ' in a sentence
    return (
      <div className="GenderOnboarding">
        <TempHeader />
        <div className="Gender-Form">
          <div className="recruiter-gender-body">
            <div className="onboarding-select-headline">
              We{ok}d love to know more about you<br />
              <div id="onboarding-select-subline">
                <center>For the best experience, tell us a little about yourself
                so we can <br />customize your group feed & connect you with the right folks</center>
              </div>
            </div>

            <div className="onboarding-gender-image">
              <img src={ knowMore } alt="onboarding" />
            </div>

            <div id="onboarding-gender-title">
              Gender
            </div>
            <Dropdown
              title="Male/Female/Non-Binary"
              list={this.state.genderItems}
              setState={this.handleChange}
            />

            <div id="onboarding-gender-title">
              Ethnicity
            </div>
            <Dropdown
              title="Asian/Black/Hispanic/Indian/Latin Americ…"
              list={this.state.ethnicityItems}
              setState={this.handleChange}
            />
            <button
              aria-label="Next"
              className="onboarding-recruiter-next-btn"
              type="submit"
              onClick={this.handleSubmit}>
              <strong>Next</strong>
            </button>
            <div className="Skip" onClick={this.openSkipModal}>
              Skip and edit info later
            </div>
          </div>
            <Modal   //////RESUME SKIP MODAL//////////
              show={this.state.skipOpen}
              onClose={this.closeSkipModal}
              className="Modal-Backdrop"
            >
            <div className="Resume-Skip">
             <img src={decline} alt="decline" />
             <div id="resume-skip-headline">
              Are you sure you want to skip?
              <div id="resume-skip-subline">
               Divercity helps connect you with the right, like-minded <br />
               candidates using your demographic info. We highly value all <br />
               forms of diversity and this information will not be disseminated.
              </div>
            </div>
            <div>
            <button
              aria-label="Back"
              className="resume-back-btn"
              type="submit"
              onClick={this.closeSkipModal}
            >
              Okay sure. Let's do this!
            </button>

            <NavLink to={`/${this.state.id}/onboarding/groups/`} alt="ok" aria-label="ok">
              <button
                aria-label="Skip"
                className="resume-skip-btn"
                type="submit"
                onClick={this.skipFirstTime}
              >
                I still want to skip
              </button>
             </NavLink>
               </div>
              </div>
            </Modal>
        </div>
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/work/2`} alt="Back">
                Back
              </NavLink>
            </div>
        <div className="progress-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="greydot"></span>
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
)(RecruiterInfo);


// <DateDropdown
//             monthList={this.state.dateMonth}
//             dayList={this.state.dateDay}
//             yearList={this.state.dateYear}
//             setDayState={this.setDate}
//             setMonthState={this.setDate}
//             setYearState={this.setDate}
//           />


// setDate(title, id, key) {
//     switch(key) {
//       case 'day':
//         let day = JSON.parse(JSON.stringify(title));
//         this.setState({
//           date_day: day
//         });
//         break;
//       case 'month':
//         let month = JSON.parse(JSON.stringify(id));
//         this.setState({
//           date_month: month
//         });
//         break;
//       case 'year':
//         let year = JSON.parse(JSON.stringify(title));
//         this.setState({
//           date_year: year
//         });
//         break;
//       default: break;
//     }
//   }
