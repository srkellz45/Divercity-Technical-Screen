import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip } from "react-toastify";
import {
  getMyJobs,
  getJobApplicants,
   } from '../../../actions/recruiter.actions';
import { getUser } from '../../../actions/user.actions';
import Header from '../../../components/Header.js';

import Applicant from '../../../components/recruiter.applicant.components.js';
//import Modal from '../../Modal';


// /:id/user/jobs/applicants/:jobid

class RecruiterApplicants extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobID: this.props.match.params.id,
      id: localStorage.id,
      isOpen: false,
    };
    this.viewApplicants = this.viewApplicants.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  viewApplicants() {
    this.setState({
      isOpen: true
    });
  }
  closeModal () {
    this.setState({
      isOpen: false,
    });
  }
  componentWillUnmount() {
    localStorage.removeItem('empty');
  }
  componentDidMount() {
    window.scrollTo(0,0);
  // if do show/hide in here for authentication can also include redirect link to login
      this.props.getUser(this.state.id);
      this.props.getMyJobs(this.state.id);
      this.props.getJobApplicants(this.state.jobID);
  }


  render() {
    console.log(this.props.applicants);
      return(
        <React.Fragment>
          <Header />
          <ToastContainer autoClose={3000} transition={Flip} />
          <div className="myJobs-body">
            <div id="user-welcome">
              { this.props.user.length <= 0 ? (
                <div id="loading">
                 <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
                </div>
                ) : null }
                <React.Fragment>
                { this.props.applicants.map((jobs) => {
                  let data = jobs.attributes;
                  return (
                    <div>

                      <Applicant
                        data={ data }
                        id={ jobs.id }
                      />
                    </div>
                  )
                })}
                </React.Fragment>
            </div>
          </div>
           { localStorage.empty ? (
              <div>
                No Applicants Yet!
              </div>) : (null)}
        </React.Fragment>
      );
  }
}

// sets store state on local props
const mapStateToProps = state => {
  return {
    user: state.userList,
    myJobs: state.myJobsList,
    applicants: state.applicantsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    getMyJobs: (id) => {
      dispatch(getMyJobs(id));
    },
    getJobApplicants: (id) => {
      dispatch(getJobApplicants(id));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruiterApplicants);
