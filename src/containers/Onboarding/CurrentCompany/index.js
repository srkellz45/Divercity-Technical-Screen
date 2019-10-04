import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';

import { getUser } from '../../../actions/user.actions';
import { updateProfile } from '../../../actions/onboard.actions';
import { addUserRating, getSingleCompany } from '../../../actions/company.actions';
import TempHeader from '../../../components/TempHeader.js';
//import Dropdown from '../../../components/Dropdown.js';
import MultiDownshift from '../../MultiDownshift/MultiDownshift.js';
import Modal from '../../Modal';
import RateCompany from '../../Company/RateCompany';
import SubmitRateCompany from '../../Company/SubmitRateCompany';
import SuccessRateCompany from '../../Company/SuccessRateCompany';
import CompanySearch from '../CompanySearch';
import company from '../../../assets/CurrentCompany.png';
import { occupationArray } from '../../../lib/selectListData';

//onboarding/work

class CurrentCompany extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      job_title: '',
      company: '',
      showJobForm: false,
      items: occupationArray,
      selectedItems: [],
      openRate: false,
      openSubmitRate: false,
      openSuccessRate: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCompany = this.setCompany.bind(this);

    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.openRate = this.openRate.bind(this);
  }
  componentWillMount(){
    window.scrollTo(0,0);
    this.props.getUser(this.state.id);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    let profileData = { "user": { } };
    this.setState({
      job_title: this.state.selectedItems
    });
    if(this.state.job_title) {
      Object.assign(profileData.user, {job_title: this.state.selectedItems});
    }
    if(this.state.company) {
      Object.assign(profileData.user, {company: this.state.company});
      // Here we want to open Rate Company Modal
    }
    console.log(profileData);
    //this.props.updateProfile(profileData, this.state.id);

    this.setState({
      job_title: '',
      company: '',
    });
  }
  setCompany(data) {
    let companyString = JSON.parse(JSON.stringify(data.attributes.name));
    console.log('Company ID:', data.id);
    this.setState({
      company: companyString,
      companyID: data.id
    }, function(){
      this.openRate();
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
      selectedItems: copy
    });
  }
  onItemChanged (item) {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1, item.value);
    this.setState({
      selectedItems: copy
    });
  }
  itemToString(i) {
    console.log(i);
    return i ? i.name : '';
  }
      
  

  render() {
    console.log(this.state.selectedItems);
    return (
      <div className="CurrentCompany">
        <TempHeader />
        <div className="onboarding-select-form">
          <div className="work-select-body">
            <div className="onboarding-select-headline">
              Where do you work currently?<br />
              <div id="onboarding-select-subline">
                This info is valuable for the recruiter and will help you land
                <br />your dream job.
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
              onItemChanged={this.onItemChanged}
              onRemoveItem={this.onRemoveItem}
              items={this.state.items}
              itemToString={this.itemToString}
            />
           <div id="onboarding-select-subline">
             <center> (Select from list or enter in your own title and press tab)</center>
            </div>
            <br />
            <br />

            <div id="onboarding-select-title">
              Current Company
            </div>
            <div className="CompanySearch">
              <CompanySearch
                setState={this.setCompany}
              />
            </div>


            <button
              aria-label="Next"
              className="onboarding-next-btn"
              type="submit"
              onClick={this.handleSubmit}>
              <strong>Next</strong>
            </button>
            <div className="Skip">
              <NavLink to="/jobs" alt="skip">
                Skip and edit info later
              </NavLink>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user : state.userList,
    occupations : state.occupationsList,
    singleCompany : state.singleCompanyList
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
    getSingleCompany: (id) => {
      dispatch(getSingleCompany(id));
    },
    addUserRating: (rating, review, id) => {
      dispatch(addUserRating(rating, review, id));
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentCompany);


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
