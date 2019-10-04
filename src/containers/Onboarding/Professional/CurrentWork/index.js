import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import history from '../../../../history';
import { getUser } from '../../../../actions/user.actions';
import { addWork } from '../../../../actions/onboard.actions';
import TempHeader from '../../../../components/TempHeader.js';
//import Dropdown from '../../../../components/Dropdown.js';
import MultiDownshift from '../../../MultiDownshift/MultiDownshift.js';
import Modal from '../../../Modal';
import CompanySearch from '../../CompanySearch';
import CitySearch from '../../CitySearch';

//import check from '../../../../assets/Checkmark.png';
import decline from '../../../../assets/Decline.png';
import company from '../../../../assets/CurrentCompany.png';
import { occupationArray } from '../../../../lib/selectListData';
import UploadProfilePhoto from '../../UploadProfilePhoto';
// url/:id/onboarding/work/1

class ProfessionalWork extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      job_title: '',
      showJobForm: false,
      items: occupationArray,
      selectedItems: [],
      city: '',
      job_employer_id: '',
      skipOpen: false,
      jobTitle: '',
      profilePhotoOpen: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.openSkipModal = this.openSkipModal.bind(this);
    this.closeSkipModal = this.closeSkipModal.bind(this);
    this.skipFirstTime = this.skipFirstTime.bind(this);
    this.setCity = this.setCity.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
  }

  componentWillMount(){
    window.scrollTo(0,0);
    this.props.getUser(this.state.id);
  }
  closeModal() {
    this.setState({
      profilePhotoOpen: false,
    });
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
    let profileData = { "user": { } };
    if(this.state.selectedItems) {
      var noEmojis = this.state.selectedItems.map(emoji => emoji.slice(3));
      Object.assign(profileData.user, {occupation: noEmojis.join(', ')});
    }
    if(this.state.city) {
      Object.assign(profileData.user, {city: this.state.city});
    }
    if(this.state.job_employer_id) {
      Object.assign(profileData.user, {job_employer_id: this.state.job_employer_id});
    }
    this.props.addWork(profileData, this.state.id);
  }
  setCompany(data) {
    if(data === 'No Company') {
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
  handleStateChange (changes, downshiftState) {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({
        items: this.getItems(changes.inputValue)
      });
    }
  }
  handleChange(selectedItem, downshiftState) {
    this.setState({
      items: occupationArray
    });
  }
  getItems (value) {
    return value ? matchSorter(occupationArray, value) : occupationArray;
  }
  onItemAdd (selectedItem) {
    this.setState({
      selectedItems: [...this.state.selectedItems, selectedItem]
    });
  }
  onRemoveItem(item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1);
    this.setState({
      selectedItems: copy,
      jobTitle: copy
    });
  }
  onItemChanged (item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1, item.value);
    this.setState({
      selectedItems: copy,
      jobTitle: copy
    });
  }
  openSkipModal (evt) {
    if(!localStorage.skipped) { // if user has already skipped once,
      this.setState({ // just let them skip without showing the modal
        skipOpen: true,
      });
    } else {
      history.push(`/${this.state.id}/onboarding/info/1`);
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
  itemToString(i) {
    console.log(i);
    return i ? i.name : '';
  }
  onUserInput (selectedItem) {
    this.setState({
      selectedItems: [...this.state.selectedItems, selectedItem],
      jobTitle: selectedItem
    });
  }
  

  render() {
    console.log(this.state);
    return (
      <div className="CurrentCompany">
        <TempHeader />
        <div className="onboarding-select-form">
          <div className="work-select-body">
            <div className="onboarding-select-headline">
              Where do you work currently?<br />
              <div id="onboarding-select-subline">
                You can choose more than one job title
              </div>
            </div>
            <div className="onboarding-select-image">
              <img src={ company } alt="onboarding" />
            </div>

            <div id="onboarding-select-title">
              Current Job title
            </div>

            <MultiDownshift
              selectedItem={this.state.selectedItems}
              onChangedState={this.handleStateChange}
              onChange={this.onItemAdd}
              onUserInput={this.onUserInput}
              onItemChanged={this.onItemChanged}
              onRemoveItem={this.onRemoveItem}
              items={this.state.items}
              itemToString={this.itemToString}
            />

            <div id="onboarding-select-title">
              Current Company
            </div>
            <div className="CompanySearch">
              <CompanySearch
                setState={this.setCompany}
                defaultValue="e.g. Divercity"
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
            <div className="Skip" onClick={this.openSkipModal}>
              Skip and edit info later
            </div>
          </div>
            <Modal  //////WORK SKIP MODAL//////////
              show={this.state.skipOpen}
              onClose={this.closeSkipModal}
              className="Modal-Backdrop"
            >
            <div className="Resume-Skip">
              <img src={decline} alt="decline" />
              <div id="resume-skip-headline">
                Are you sure you want to skip?
                <div id="resume-skip-subline">
                  Divercity helps connect you with the right, like-minded folks<br />
                  using your demographic info. We highly value all forms of <br />
                  diversity and this information will not be disseminated.
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

              <NavLink to={`/${this.state.id}/onboarding/info/1`} alt="ok" aria-label="ok">
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
    occupations : state.occupationsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (ID) => {
      dispatch(getUser(ID))
    },
    addWork: (data, ID) => {
      dispatch(addWork(data, ID))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalWork);


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
