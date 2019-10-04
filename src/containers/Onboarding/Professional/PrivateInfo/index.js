import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../../../history';
import { getUser } from '../../../../actions/user.actions';
import { updateProfile } from '../../../../actions/onboard.actions';
import { getRatings, addUserRating, getSingleCompany } from '../../../../actions/company.actions';
import TempHeader from '../../../../components/TempHeader.js';
import Dropdown from '../../../../components/Dropdown.js';
import Modal from '../../../Modal';
import RateCompany from '../../../Company/RateCompany';
import SubmitRateCompany from '../../../Company/SubmitRateCompany';
import SuccessRateCompany from '../../../Company/SuccessRateCompany';
import knowMore from '../../../../assets/KnowMore.png';
//import check from '../../../../assets/Checkmark.png';
import decline from '../../../../assets/Decline.png';
import {
  genderList,
  ethnicityList,
  ageRangeList } from '../../../../lib/selectListData';
import CompanySizeDropdown from '../../../../components/CompanySizeDropdown';

// url/:id/onboarding/info/1

class PrivateInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      genderItems: genderList,
      ethnicityItems: ethnicityList,
      ageRangeList: ageRangeList,
      gender: null,
      ethnicity: null,
      age_range: null,
      user: [],
      files: [],
      skipOpen: false,
      openRate: true,
      openSubmitRate: false,
      openSuccessRate: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openSkipModal = this.openSkipModal.bind(this);
    this.closeSkipModal = this.closeSkipModal.bind(this);
    this.skipFirstTime = this.skipFirstTime.bind(this);
    this.closeRateModal = this.closeRateModal.bind(this);
    this.openRate = this.openRate.bind(this);
    this.openSubmitRate = this.openSubmitRate.bind(this);
    this.openSuccessRate = this.openSuccessRate.bind(this);
    this.companyRating = this.companyRating.bind(this);
    this.submitCompanyRating = this.submitCompanyRating.bind(this);
    this.closeRateModal = this.closeRateModal.bind(this);
    this.closeSubmitRateModal = this.closeSubmitRateModal.bind(this);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
  }

  handleChange(title, id, emoji, idk, key) {
    let titleString = JSON.parse(JSON.stringify(title));
    this.setState({
      [key] : titleString
    });
  }
  async componentDidMount(){
    window.scrollTo(0,0);
    let ID = parseInt(localStorage.getItem('id'));
    this.props.getUser(ID)//.then(() => {
    //   this.props.getSingleCompany(this.props.user.attributes.company.id);
    // });
    // this.openRate();
    //
    
    // if(this.props.user.attributes.company.id != undefined){
    //   console.log("props", this.props.user);
    //   this.setState({
    //     companyID: this.props.user.attributes.company.id
    //   }, function(){
    //     this.props.getSingleCompany(this.state.companyID);
    //   });
    // }
    
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
    if(this.state.age_range) {
      Object.assign(profileData.user, {age_range: this.state.age_range});
    }

    this.props.updateProfile(profileData, localStorage.id);

    this.setState({
      gender: '',
      ethnicity: '',
      age_range: '',
    });
  }
  openSkipModal (evt) {
    if(!localStorage.skipped) { // if user has already skipped once,
      this.setState({ // just let them skip without showing the modal
        skipOpen: true,
      });
    } else {
      history.push(`/${this.state.id}/onboarding/groups`);
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
  openRate(){
    //evt.preventDefault();
    //this.props.getSingleCompany(this.props.user.attributes.company.id);
    this.setState({
      openRate: true
    }, function () {
      console.log(this.props.user);
    });
  }
  openSubmitRate(evt){
    evt.preventDefault();
    this.props.getSingleCompany(this.props.match.params.id);
    this.setState({
      openSubmitRate: true
    });

    this.closeRateModal();
  }
  openSuccessRate(){ 
    this.setState({
      openSuccessRate: true
    });
  }
  closeRateModal () {
    this.setState({
      openRate: false
    });
  }
  closeSubmitRateModal () {
    this.setState({
      openSubmitRate: false
    });
  }
  closeSuccessModal () {
    this.setState({
      openSuccessRate: false
    }, function (){
      this.props.getSingleCompany(this.props.match.params.id); // Need to update this.props to company ID 
      this.props.getRatings(this.props.match.params.id);
    });
  }
  companyRating  (evt) {
    this.setState({ 
        userRating: parseInt(evt.target.id)
        }, function(){
          this.openSubmitRate(evt);
      });
  }

  // Here we will call an action to POST userRating and review
  submitCompanyRating (review, id){
    this.setState({
        openSubmitRate: false
      }, function(){
        this.props.addUserRating(this.state.userRating, review, id);
        this.openSuccessRate();
    });
      
  }

  render() {
    //console.log("hello", this.props.user);
    let ok = "'"; // just allows me to use a ' in a sentence
    return (
      <div className="GenderOnboarding">
        <TempHeader />
        <div className="Gender-Form">
          <div className="onboarding-gender-body">
            <div className="onboarding-select-headline">
              We{ok}d love to know more about you<br />
              <div id="onboarding-select-subline">
                <center>For the best experience, tell us a little about yourself
                so we can <br />customize your group feed & connect you with the right folks.</center>
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

            <div id="onboarding-gender-title">
              Age Range
            </div>
            <Dropdown
              title="13-17/18-24/25-34/35-44/45-54/55-64..."
              list={this.state.ageRangeList}
              setState={this.handleChange}
            />

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
            <Modal   //////INFO SKIP MODAL//////////
              show={this.state.skipOpen}
              onClose={this.closeSkipModal}
              className="Modal-Backdrop"
            >
            <div className="Resume-Skip">
             <img src={decline} alt="decline" />
             <div id="resume-skip-headline">
              Are you sure you want to skip?
              <div id="resume-skip-subline">
               Your demographic info will allow Divercity, recruiters, <br />
               and companies that care about diversity be more intentional <br />
               and calculated about getting you the right role and connections.
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

            <NavLink to={`/${this.state.id}/onboarding/groups`} alt="ok" aria-label="ok">
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
              <NavLink to={`/${this.state.id}/onboarding/work/1`} alt="Back">
                Back
              </NavLink>
            </div>
        <div className="progress-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="greydot"></span>
          <span class="dot"></span>
        </div>
        
        <Modal  ///// RATE MODAL ///////
          show={this.state.openRate}
          onClose={ this.closeRateModal }
          className="Modal-Backdrop"
        >
          <RateCompany
            show={ this.openRate }
            onClose={ this.closeRateModal }
            onRate={ this.companyRating }
            data={ this.props.singleCompany }
            companyID={ this.props.companyID }
          >
          </RateCompany>
        </Modal>
        <Modal
          show={this.state.openSubmitRate}
          onClose={ this.closeSubmitRateModal }
          className="Modal-Backdrop"
        >
          <SubmitRateCompany
            show={ this.openSubmitRate }
            onClose={ this.closeSubmitRateModal }
            submitRating={ this.submitCompanyRating }
            rating={ this.state.userRating }
            data={ this.props.singleCompany }
            companyID={ this.props.companyID }
          >
          </SubmitRateCompany>
        </Modal>
        <Modal
          show={this.state.openSuccessRate}
          onClose={ this.closeSuccessModal }
          className="Modal-Backdrop"
        >
          <SuccessRateCompany
              show={ this.openSuccessRate }
              onClose={ this.closeSuccessModal }
          >
          </SuccessRateCompany>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user : state.userList,
    singleCompany : state.singleCompanyList,
    reviews: state.companyRatingsList,
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
    getRatings: (id) => {
      dispatch(getRatings(id))
    },
    getSingleCompany: (id) => {
      dispatch(getSingleCompany(id));
    },
    addUserRating: (rating, review, id) => {
      dispatch(addUserRating(rating, review, id));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateInfo);


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
