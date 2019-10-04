import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import { ToastContainer, Flip, toast } from "react-toastify";

import history from '../../../../history';

import { getUser } from '../../../../actions/user.actions';
import { addWork } from '../../../../actions/onboard.actions';
import TempHeader from '../../../../components/TempHeader.js';
//import Dropdown from '../../../../components/Dropdown.js';

import CompanySearch from '../../CompanySearch';
import USCitiesSearch from '../../../USCitiesSearch';
import CitySearch from '../../CitySearch';
import Modal from '../../../Modal';
import company from '../../../../assets/CurrentCompany.png';
import check from '../../../../assets/Checkmark.png';
import decline from '../../../../assets/Decline.png';
import UploadProfilePhoto from '../../UploadProfilePhoto';
// url/:id/onboarding/work/2

class RecruiterWork extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      job_title: '',
      city: '',
      job_employer_id: '',
      companyName: [],
      skipOpen: false,
      profilePhotoOpen: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.setCity = this.setCity.bind(this);
    this.openSkipModal = this.openSkipModal.bind(this);
    this.closeSkipModal = this.closeSkipModal.bind(this);
    this.skipFirstTime = this.skipFirstTime.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0,0);
    this.props.getUser(this.state.id);
  }
  closeModal () {
    this.setState({
      profilePhotoOpen: false
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let profileData = { "user": { } };
    if(this.state.job_employer_id) {
      Object.assign(profileData.user, {job_employer_id: this.state.job_employer_id});
    }
    if(this.state.city) {
      Object.assign(profileData.user, {city: this.state.city});

      this.props.addWork(profileData, this.state.id);
    } else {
      toast.error(`Please fill out the information`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  }
  setCompany(data) {
    if(data === 'None') {
      this.setState({
        job_employer_id: null
      });
    }
    let companyID = data.id;
    this.setState({
      job_employer_id: companyID
    });
  }
  setCity(data) {
    console.log(data);
    this.setState({
      city: data.attributes.name + ', ' + data.attributes.country_name
    });
  }
  openSkipModal (evt) {
    if(!localStorage.skipped) { // if user has already skipped once,
      this.setState({ // just let them skip without showing the modal
        skipOpen: true,
      });
    } else {
      history.push(`/${this.state.id}/onboarding/info/2`);
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
    let ok = "'";
    return (
      <div className="CurrentCompany">
        <TempHeader />
        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        <div className="onboarding-select-form">
          <div className="work-select-body">
            <div className="onboarding-select-headline">
              What company do you work for currently?<br />
              <div id="onboarding-select-subline">
                Tell us on behalf of what company you{ok}ll be posting jobs.<br />
              </div>
            </div>
            <div className="onboarding-select-image">
              <img src={ company } alt="onboarding" />
            </div>
            <div id="onboarding-select-title">
              Location
            </div>
            <div className="CitySearch">
              <CitySearch
               setState={this.setCity}

              />
            </div>
            <div id="onboarding-select-title">
              Current Company
            </div>
            <div className="CompanySearch">
              <CompanySearch
                setState={this.setCompany}
                defaultValue="e.g. Divercity"
              />
            </div>

            <button
              aria-label="Next"
              className="onboarding-next-btn"
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

            <NavLink to={`/${this.state.id}/onboarding/info/2`} alt="ok" aria-label="ok">
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
              <NavLink to={`/${this.state.id}/onboarding`} alt="Back">
                Back
              </NavLink>
            </div>
        <div className="progress-dots">
          <span className="dot"></span>
          <span className="greydot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <Modal
          show={this.state.profilePhotoOpen}
          onClose={this.closeModal}
          className="Modal-Backdrop"
        >
          <UploadProfilePhoto
            closeModal={this.closeModal}
          />
        </Modal>
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
    addWork: (data, ID) => {
      dispatch(addWork(data, ID))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruiterWork);
