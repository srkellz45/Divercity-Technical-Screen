import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getExperience,
    getUser,
    editExperience,
    deleteExperience
  } from '../../actions/user.actions';

import EditExperienceComponent from '../../components/user.editExperience.components';

class EditExperience extends Component {
  constructor(props){
    super(props);
    console.log(props.experienceID);
    this.state = {
      experienceAddOpen: false,
      is_present: '',
      role: '',
      job_employer_id: '',
      location: '',
      job_start: '',
      job_end: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      experienceIDToEdit: props.experienceID,
      singleExperience: ''
    };
    this.handleRole = this.handleRole.bind(this);
    this.handleStartDates = this.handleStartDates.bind(this);
    this.handleEndDates = this.handleEndDates.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.setCity = this.setCity.bind(this);
    this.handleDeleteExperience = this.handleDeleteExperience.bind(this);
    this.handleEditExperience = this.handleEditExperience.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0,0);
    let singleExperience = this.props.experience.filter((experience) => {
        return experience.id === this.state.experienceIDToEdit;
    });
    this.setState({
      singleExperience: singleExperience[0],
      is_present: singleExperience[0].attributes.is_present,
    });
  }
  openAddExperience (evt) {
    evt.preventDefault();
    this.setState({
      experienceAddOpen: true,
    });
  }
  closeModal (evt) {
    this.props.closeExperience();
  }
  handleEditExperience (evt) {
    evt.preventDefault();
    let experienceData = {};
    if(this.state.role) {
      Object.assign(experienceData, {role: this.state.role});
    }
    if(this.state.job_employer_id) {
      Object.assign(experienceData, {job_employer_id: this.state.job_employer_id});
    }
    if(this.state.location) {
      Object.assign(experienceData, {location_words: this.state.location});
    }
    if(this.state.startMonth && this.state.startYear) {
      Object.assign(experienceData, {job_start: this.state.startMonth + ", " + this.state.startYear});
    } else if (this.state.startMonth && !this.state.startYear) {
      Object.assign(experienceData, {job_start: this.state.startMonth});
    } else if (this.state.startYear && !this.state.startMonth) {
      Object.assign(experienceData, {job_start: this.state.startYear});
    }
    if(this.state.endMonth && this.state.endYear) {
      Object.assign(experienceData, {job_end: this.state.endMonth + ", " + this.state.endYear});
    } else if (this.state.endMonth && !this.state.endYear) {
      Object.assign(experienceData, {job_end: this.state.endMonth});
    } else if (this.state.endYear && !this.state.endMonth) {
      Object.assign(experienceData, {job_end: this.state.endYear});
    }
    if(this.state.is_present) {
      Object.assign(experienceData, {is_present: this.state.is_present, job_end: 'present'});
    } else { Object.assign(experienceData, {is_present: false }); }
    this.props.editExperience(experienceData, this.state.experienceIDToEdit, localStorage.id);
    this.closeModal();
  }

  handleStartDates (title, genderEmoji, emoji, id, type) {
    if(type === 'month') {
      this.setState({
        startMonth: title
      });
    }
    if(type === 'year') {
      this.setState({
        startYear: title
      });
    }
  }
  handleEndDates (title, genderEmoji, emoji, id, type) {
    if(type === 'month') {
      this.setState({
        endMonth: title
      });
    }
    if(type === 'year') {
      this.setState({
        endYear: title
      });
    }
    this.setState({
      job_end: this.state.endMonth + ", " + this.state.endYear,
    });
  }
  handleRole (evt) {
    evt.preventDefault();
    this.setState({
      role: evt.target.value,
    });
  }
  setCompany(data) {
    let companyID = data.id;
    this.setState({
      job_employer_id: companyID
    });
  }
  setCity(data) {
    let city = data.city + ', ' + data.state;
    this.setState({
      location: city
    });
  }
  handleCheck(evt) {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleDeleteExperience(evt) {
    evt.preventDefault();
    this.props.deleteExperience(this.state.experienceIDToEdit);
    this.closeModal();
  }
  render() {
    return (
      <React.Fragment>
        { this.state.singleExperience.length <= 0 ? (
          <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
        ) : (
          <div>
            <EditExperienceComponent
              experience={ this.state.singleExperience.attributes }
              id={ this.props.experience.id }
              handleTitle={ this.handleRole }
              handleCheck={ this.handleCheck }
              handleStartDates={ this.handleStartDates }
              handleEndDates={ this.handleEndDates }
              setCompany={this.setCompany}
              setCity={this.setCity}
              isChecked={ this.state.is_present }
            />

            <button
                className="AddExperience-close-btn"
                type="button"
                onClick={ this.closeModal } >
                X
            </button>
            <div className="AddExperience-buttons">
              <button
                className="removeExperience-btn"
                type="button"
                onClick={this.handleDeleteExperience} >
                Remove
              </button>

              <button
                className="addExperience-btn"
                type="button"
                onClick={this.handleEditExperience} >
                Save
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userList,
    experience: state.experienceList,
    modal: state.modal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    getExperience: (id) => {
      dispatch(getExperience(id));
    },
    editExperience: (experience, experienceID, id) => {
      dispatch(editExperience(experience, experienceID, id))
    },
    deleteExperience: (experienceID, id) => {
      dispatch(deleteExperience(experienceID, id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExperience);