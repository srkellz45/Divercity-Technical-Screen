import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getUser,
    editEducation,
    deleteEducation,
    getEducation,
  } from '../../actions/user.actions';
import EditEducationComponent from '../../components/user.editEducation.components';

class EditEducation extends Component {
  constructor(props){
    super(props);
    let Degree;
    let Major;
    if(props.education) {
      Degree = props.education[0].attributes.qualification.split("in")[0];
      Major = props.education[0].attributes.qualification.substring(props.education[0].attributes.qualification.indexOf('in') + 3);
    }
    this.state = {
      educationAddOpen: false,
      school_id: '',
      major: Major,
      degree: Degree,
      startYear: '',
      endYear: '',
      educationIDtoEdit: props.educationID,
      singleEducation: ''
    };
    this.setSchool = this.setSchool.bind(this);
    this.setMajor = this.setMajor.bind(this);
    this.setDegree = this.setDegree.bind(this);
    this.handleStartDates = this.handleStartDates.bind(this);
    this.handleEndDates = this.handleEndDates.bind(this);
    this.handleEditEducation = this.handleEditEducation.bind(this);
    this.handleDeleteEducation = this.handleDeleteEducation.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0,0);
    let singleEducation = this.props.education.filter((education) => {
        return education.id === this.state.educationIDtoEdit;
    });
    this.setState({
      singleEducation: singleEducation[0],
    });
  }
  closeModal (evt) {
    this.props.closeEducation();
  }
  handleEditEducation (evt) {
    evt.preventDefault();
    let educationData = {};
    if(this.state.school_id) {
      Object.assign(educationData, {school_id: this.state.school_id});
    }
    if(this.state.startYear) {
      Object.assign(educationData, {start_year: this.state.startYear});
    }
    if(this.state.endYear) {
      Object.assign(educationData, {end_year: this.state.endYear});
    }
    if(this.state.major && this.state.degree) {
      Object.assign(educationData, {qualification: this.state.degree + " in " + this.state.major});
    }
    this.props.editEducation(educationData, this.state.educationIDtoEdit, localStorage.id);
    this.closeModal();
  }

  handleStartDates (title, genderEmoji, emoji, id, type) {
    if(type === 'year') {
      this.setState({
        startYear: title
      });
    }
  }
  handleEndDates (title, genderEmoji, emoji, id, type) {
    if(type === 'year') {
      this.setState({
        endYear: title
      });
    }
  }
  setSchool (data) {
    this.setState({
      school_id: data.id,
    });
  }
  setMajor (data) {
    this.setState({
      major: data.attributes.name,
    });
  }
  setDegree (data) {
    this.setState({
      degree: data,
    });
  }
  handleDeleteEducation(evt) {
    evt.preventDefault();
    this.props.deleteEducation(this.state.educationIDtoEdit, localStorage.id);
    this.closeModal();
  }
  render() {
    console.log(this.state.singleEducation.attributes);
    return (
      <React.Fragment>
        { this.state.singleEducation.length <= 0 ? (
          <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
        ) : (
          <div>
            <EditEducationComponent
              education={ this.state.singleEducation.attributes }
              id={ this.props.education.id }
              setSchool={ this.setSchool }
              setMajor={ this.setMajor }
              handleDegree={ this.setDegree }
              handleStartDates={ this.handleStartDates }
              handleEndDates={ this.handleEndDates }
            />
          <div>
            <button
                className="AddEducation-close-btn"
                type="button"
                onClick={ this.closeModal } >
                X
            </button>
            <div className="AddExperience-buttons">
              <button
                className="removeExperience-btn"
                type="button"
                onClick={this.handleDeleteEducation} >
                Remove
              </button>

              <button
                className="addExperience-btn"
                type="button"
                onClick={this.handleEditEducation} >
                Save
              </button>
            </div>
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
    education: state.educationList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    editEducation: (education, educationID, id) => {
      dispatch(editEducation(education, educationID, id))
    },
    deleteEducation: (educationID, id) => {
      dispatch(deleteEducation(educationID, id))
    },
    getEducation: (id) => {
      dispatch(getEducation(id));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEducation);