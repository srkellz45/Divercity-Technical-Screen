import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { getJobsByUser, loadSingleJob, saveJob } from '../../../actions/job.actions';
import { getUser } from '../../../actions/user.actions';
import Header from '../../../components/Header';
import JobModal from '../JobApplyModal';
import ApplyJob from '../ApplyJob';
import Job from '../../../components/Job';
import JobApply from '../../../components/job.apply.components';
import { ToastContainer } from "react-toastify";

class JobsByRecruiter extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      jobId: '',
      loading: false,
      applyOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJobApply = this.handleJobApply.bind(this);
    this.handleJobSave = this.handleJobSave.bind(this);
    this.closeApplyModal = this.closeApplyModal.bind(this);
  }
  openModal (evt) {
    this.setState({
      isOpen: true,
    });
  }

  closeModal () {
    this.setState({
      isOpen: false
    });
  }
  closeApplyModal () {
    this.setState({
      applyOpen: false
    });
  }
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getUser(localStorage.id);
    this.props.getJobsByUser(this.props.match.params.id);
  }

  handleChange(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.props.loadSingleJob(target.id);
    this.setState({
      jobId : target.id,
      isOpen: true,
      singleJob: this.props.singleJob
    });
  }
  handleJobApply(evt) {
    this.setState({
      applyOpen: true,
      isOpen: false
    });
  }
  handleJobSave(evt) {
    this.setState({
      isOpen: false,
      applyOpen: false,
    });
    this.props.saveJob(this.state.jobId);
  }
  render() {
    return(
      <div id="main">
      <Header />
      <ToastContainer autoClose={3000} />
      { this.props.jobs.length <= 0 ? (
          <div id="loading">
          <p className="loading">Getting jobs by that Recruiter<span>.</span><span>.</span><span>.</span></p>
          </div>
        ) : null }
        <div className="job-grid" >
        { this.props.jobs.map((job) => {
          let jobs = job.attributes;
          return (
            <div className="Job" key={ job.id }>
              <Job
                title={ jobs.title }
                date={ Moment(jobs.created_at).fromNow() }
                skills={ jobs.skills_tag }
                description={ jobs.description }
                employer={ jobs.employer }
                location={ jobs.location_display_name }
                id={ job.id }
                handler={this.handleChange}
                applied={jobs.is_applied_by_current}
                saved={jobs.is_bookmarked_by_current}
              />
            </div>
          );
        })}
        <div>
          <JobModal // APPLY OR SAVE MODAL // SINGLE JOB VIEW
            show={this.state.isOpen}
            onClose={this.closeModal}
            className="Modal-Backdrop"
          >
            { this.props.singleJob.id === this.state.jobId ? (
              <JobApply
                data={ this.props.singleJob }
                apply={this.handleJobApply}
                save={this.handleJobSave}
                close={this.closeModal}
              />
            ) : (
              <div id="modal-loading">
                <p className="loading">
                  <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
                </p>
              </div>
            )}
          </JobModal>

          <JobModal // APPLY JOB MODAL
            show={this.state.applyOpen}
            onClose={this.closeApplyModal}
            data={this.props.user}
          >
            <ApplyJob
              apply={this.handleJobApply}
              onClose={this.closeApplyModal}
            />
          </JobModal>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    jobs : state.recruiterJobsList,
    singleJob : state.singleJobList,
    user : state.userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJobsByUser: (userID) => {
      dispatch(getJobsByUser(userID));
    },
    loadSingleJob: (id) => {
      dispatch(loadSingleJob(id));
    },
    getUser: (id) => {
      dispatch(getUser(id));
    },
    saveJob: (id) => {
      dispatch(saveJob(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsByRecruiter);

