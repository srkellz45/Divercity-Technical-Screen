import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import Header from '../../components/Header';
import { ToastContainer, Flip } from "react-toastify";
import { getSimilarJobs, loadSingleJob, saveJob } from '../../actions/job.actions';
import { performSearch } from '../../actions/search.actions';
import { getUser } from '../../actions/user.actions';
import { followRecommendedConnections } from '../../actions/connection.actions';
import UserResults from '../../components/search.user.components.js';
import CompanyResults from '../../components/search.company.components.js';
import GroupResults from '../../components/search.group.components.js';
import Job from '../../components/Job';
import Group from '../../components/Group';
import JobModal from '../Job/JobApplyModal';
import ApplyJob from '../Job/ApplyJob';
import SimilarJob from '../../components/SimilarJob';
import JobApply from '../../components/job.apply.components';
import LoadingSpinner from '../../components/LoadingSpinner';

class SearchResults extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: props.match.params.query,
      groupId: '',
      page: 1,
      isOpen: false,
      jobId: '',
      applyOpen: false,
    };
  }

  openModal = bool => {
  	this.setState({
  		isOpen: bool
  	});
  }

  closeApplyModal = () => {
    this.setState({
      applyOpen: false
    });
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.performSearch(this.state.page, this.state.query);
    //this.props.loadGroups();
    localStorage.setItem("pageLimit", 10);
  }

  handleChange = evt => {
    evt.preventDefault();

    const target = evt.target;
    this.props.loadSingleJob(target.id);

    this.setState({
      jobId : target.id,
      isOpen: true,
      singleJob: this.props.singleJob
    });
  }

  handleJobApply = evt => {
    this.setState({
      applyOpen: true,
      isOpen: false
    });
  }

  handleQuickApply = evt => {
    evt.preventDefault();

    const target = evt.target;
    this.props.loadSingleJob(target.id);

    this.setState({
      jobId : target.id,
      applyOpen: true,
      //singleJob: this.props.singleJob
    });
  }

  handleJobSave = evt => {
    this.setState({
      isOpen: false,
      applyOpen: false,
    });

    this.props.saveJob(this.state.jobId);
  }

  similarJobs = evt => console.log(evt.target.id);

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    });

    this.props.loadMoreJobs(this.state.page);
  }

  connectWithUser = evt => {
    evt.preventDefault();

    this.props.followRecommendedConnections(evt.target.id, 'follow');
  }

  render() {
  	const { companies, users, groups } = this.props;

    return(
      <div id="main">
        <Header />

        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />

        <div className="Search-Results">
        	{ !companies.length && !users.length && !groups.length ? <LoadingSpinner/> : null }

          { companies.length <= 0 ? null : (
            <div className="Company-Results">
              <CompanyResults
                data={ companies }
              />
            </div>
          )}

          { users.length <= 0 ? null : (
            <div className="User-Results">
              <UserResults
                data={ users }
                connect={ this.connectWithUser }
              />
            </div>
          )}

          { groups.length <= 0 ? null : (
            <div className="Group-Results">
              <GroupResults
                data={ groups }
              />
            </div>
          )}

			{ this.props.jobs.map(job => (
				<div className="Job-Results" key={ job.id }>
					<Job
						data={ job }
						id={ job.id }
						handler={this.handleChange}
						quickApply={this.handleQuickApply}
					/>
				</div>
			))}

            <JobModal // APPLY OR SAVE MODAL // SINGLE JOB VIEW
              show={this.state.isOpen}
              onClose={() => this.openModal(false)}
              className="Modal-Backdrop"
            >
              { this.props.singleJob.id === this.state.jobId ? (
                <JobApply
                  data={ this.props.singleJob }
                  apply={this.handleJobApply}
                  save={this.handleJobSave}
                  close={() => this.openModal(false)}
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
    )
  }
}

const mapStateToProps = (state) => ({
     groups : state.searchGroupsList,
     users : state.searchUserList,
     companies : state.companiesList,
     jobs : state.searchJobsList,
     singleJob : state.singleJobList
})

export default connect(mapStateToProps, {followRecommendedConnections, getSimilarJobs, loadSingleJob, getUser, saveJob, performSearch})(SearchResults);