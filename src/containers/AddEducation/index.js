import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getUser,
    addEducation,
    getEducation,
  } from '../../actions/user.actions';
import Dropdown from '../../components/Dropdown';
import AddEducationComponent from '../../components/user.addEducation.components';

class AddEducation extends Component {
  constructor(props){
    super(props);
    this.state = {
      educationAddOpen: false,
      school_id: '',
      major: '',
      degree: '',
      startYear: '',
      endYear: '',

    };
    this.setSchool = this.setSchool.bind(this);
    this.setMajor = this.setMajor.bind(this);
    this.setDegree = this.setDegree.bind(this);
    this.handleStartDates = this.handleStartDates.bind(this);
    this.handleEndDates = this.handleEndDates.bind(this);
    this.handleAddEducation = this.handleAddEducation.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getUser(localStorage.id);

  }
  closeModal (evt) {
    this.props.closeEducation();
  }
  handleAddEducation (evt) {
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
    } else if (this.state.major && !this.state.degree) {
      Object.assign(educationData, {qualification: this.state.major});
    } else if (this.state.degree && !this.state.major) {
      Object.assign(educationData, {qualification: this.state.degree});
    }
    this.props.addEducation(educationData, localStorage.id);
    console.log(educationData);
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
    console.log(data);
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
  render() {
    return (
      <React.Fragment>
        { this.props.user.length <= 0 ? (
          <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
        ) : (
          <div>
            <AddEducationComponent
              user={ this.props.user.attributes }
              id={ this.props.user.id }
              setSchool={ this.setSchool }
              setMajor={ this.setMajor }
              handleDegree={ this.setDegree }
              handleStartDates={ this.handleStartDates }
              handleEndDates={ this.handleEndDates }
            />

            <button
                className="AddEducation-close-btn"
                type="button"
                onClick={ this.closeModal } >
                X
            </button>
            <div className="AddEducation-buttons">
              <button
                className="addEducation-btn"
                type="button"
                onClick={this.handleAddEducation} >
                Add
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
    education: state.educationList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    addEducation: (data, id) => {
      dispatch(addEducation(data, id))
    },
    getEducation: (id) => {
      dispatch(getEducation(id));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEducation);