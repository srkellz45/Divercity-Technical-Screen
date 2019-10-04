import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip } from "react-toastify";
import Moment from 'moment';

import {
    getSavedJobs,
    loadJobs,
    loadJobTypes,
    loadSingleJob,
    loadMoreJobs,
    saveJob,
    removeSavedJob,
    getApplication,
    filterJobs
  } from '../../../actions/job.actions';
import {
  getMyJobs,
  publishUnpublish,
  deleteJob,
  getJobApplicants
   } from '../../../actions/recruiter.actions';
import {
  getUser,
  getMyApplications,
  cancelApplication
} from '../../../actions/user.actions';
import { getCompanySizes } from '../../../actions/company.actions';

import APIDropdown from '../../../components/APIDropdown.js';
import Header from '../../../components/Header';
import FilterCitiesSearch from '../../FilterCitiesSearch';
import ScrollButton from '../ScrollButton';
import JobModal from '../JobApplyModal';
import Modal from '../../Modal';
import ApplyJob from '../ApplyJob';
import JobApplicants from '../JobApplicants';
import EditJob from '../EditJob';
import Saved from '../../../components/user.saved.components.js';
import Application from '../../../components/user.application.components.js';
import AppliedJobView from '../../../components/user.appliedJobSingle.components';
import Dropdown from '../../../components/Dropdown.js';
import Job from '../../../components/Job';
import JobApply from '../../../components/job.apply.components';
import MyJob from '../../../components/user.myJob.components.js';
import MyJobUnpublished from '../../../components/user.myJobUnpublished.components.js';
import CompanySizeDropdown from '../../../components/CompanySizeDropdown.js';
import CitySearch from '../../Onboarding/CitySearch';
import FilterIndustry from '../FilterIndustry';
import { filterList, requiredExperienceList } from '../../../lib/selectListData';
import decline from '../../../assets/Decline.png';

class JobsFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: this.props.match.params.id,
      deleteOpen: false,
      applicationToBeCancelled: '',
      viewOpen: false,
      applicationId: '',
      isOpen: false,
      jobId: '',
      loading: false,
      applyOpen: false,
      editOpen: false,
      page: 1,
      jobSelected: true,
      applicationSelected: false,
      savedSelected: false,
      postedSelected: false,
      openCheck: false,
      viewApplicants: false,
      deleteID: '',
      unSaveID: '',
      sorting: "Latest",
      city: null,
      size: null,
      industry: null,
      filterItems: filterList,
      experienceItems: requiredExperienceList,
      filterJobTypeID: '',
      filterIndustry: '',
      filterCompanySize: '',
      filterOrder: '',
      filterLocation: '',
      filterCompany: '',
      filterExperience: '',
      intervalId: 0,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJobApply = this.handleJobApply.bind(this);
    this.handleJobSave = this.handleJobSave.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleQuickApply = this.handleQuickApply.bind(this);
    this.closeApplyModal = this.closeApplyModal.bind(this);
    this.handleSelectors = this.handleSelectors.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.unSave = this.unSave.bind(this);
    this.handleUnSave = this.handleUnSave.bind(this);

    this.setIndustry = this.setIndustry.bind(this);

    this.setSize = this.setSize.bind(this);
    this.handleCancelApplication = this.handleCancelApplication.bind(this);
    this.openCancelModal = this.openCancelModal.bind(this);
    this.closeCancelModal = this.closeCancelModal.bind(this);
    this.openViewModal = this.openViewModal.bind(this);
    this.closeViewModal = this.closeViewModal.bind(this);
    this.handleApplicationChange = this.handleApplicationChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.handleLocationinput = this.handleLocationinput.bind(this);
    this.handleFilterOrder = this.handleFilterOrder.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleFilterExperience = this.handleFilterExperience.bind(this);
    this.setFilterCity = this.setFilterCity.bind(this);
    this.setFilterJobType = this.setFilterJobType.bind(this);
    this.publish = this.publish.bind(this);
    this.unPublish = this.unPublish.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.isBottom = this.isBottom.bind(this);
    this.viewApplications = this.viewApplications.bind(this);
    this.closeViewApplicants = this.closeViewApplicants.bind(this);
  }
  openModal (evt) {
    this.setState({
      isOpen: true,
    });
  }
  openEdit (evt) {
    evt.preventDefault();
    const target = evt.target;
    this.props.loadSingleJob(target.id);
    this.setState({
      jobId : target.id,
      editOpen: true,
      singleJob: this.props.singleJob
    });
  }
  handleSelectors (evt) {
    this.setState({
      jobSelected: false,
      postedSelected: false,
      applicationSelected: false,
      savedSelected: false,
      [evt.target.id] : true
    });
    if(evt.target.id === 'jobsSelected') {
      this.props.loadJobs();
    }
  }
  closeEdit() {
    this.setState({
      editOpen: false,
    });
  }
  closeModal () {
    this.setState({
      isOpen: false,
      openCheck: false,
      deleteOpen: false,
    });
  }
  closeApplyModal () {
    this.setState({
      applyOpen: false
    });
  }
  componentDidMount() {
    window.scrollTo(0,0);
    localStorage.removeItem('filter_empty');
    this.props.getUser(localStorage.id);
    this.props.loadJobs();
    this.props.loadJobTypes();
    this.props.getSavedJobs();
    this.props.getMyJobs(localStorage.id);
    this.props.getCompanySizes();
    this.props.getMyApplications();
    localStorage.setItem("pageLimit", 10);
    document.addEventListener('scroll', this.trackScrolling);

  }
  componentWillUnmount() {// Revoke the data uris to avoid memory leaks
    localStorage.removeItem('filter_empty');
    document.removeEventListener('scroll', this.trackScrolling);
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
  handleQuickSave(evt) {
    this.props.saveJob(evt.target.id);
  }
  handleQuickApply(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.props.loadSingleJob(target.id);
    this.setState({
      jobId : target.id,
      applyOpen: true,
      //singleJob: this.props.singleJob
    });
  }
  loadMore() {
    this.setState({
      page: this.state.page + 1
    });
    this.props.loadMoreJobs(this.state.page);
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  trackScrolling() {
    const wrappedElement = document.getElementById('main');
    if (this.isBottom(wrappedElement)) {
      this.loadMore();
    }
  }


  unSave (evt) {
    this.setState({
      openCheck: true,
      unSaveID: evt.target.id
    });
  }
  handleUnSave (evt) {
    this.props.removeSavedJob(this.state.unSaveID);
    this.setState({
      openCheck: false,
      unSaveID: ''
    });
  }
  setFilterJobType(title, id) {
    this.setState({
      filterJobTypeID: id
    });
  }
  setFilterCity(data) {
    this.setState({
      filterLocation: data.city + ', ' + data.state
    });
  }

  handleFilterOrder(evt) {
    if(evt === "Latest") {
      this.setState({
        filterOrder: "&order=desc",
      });
    }
    if(evt === "Oldest") {
      this.setState({
        filterOrder: "&order=asc",
      });
    }
  }
  handleFilterExperience(evt) {
    this.setState({
      filterExperience: evt
    });
  }
  handleFilterSubmit(evt) {
    let link = '';
    if(this.state.filterOrder) {
      link = link + this.state.filterOrder;
    }
    if(this.state.filterLocation) {
      link = link + `&search_query=${this.state.filterLocation}`;
    }
    if(this.state.filterJobTypeID) {
      link = link + `&job_type_ids=[${this.state.filterJobTypeID}]`;
    }
    if(this.state.filterExperience) {
      link = link + `&search_experience=${this.state.filterExperience}`;
    }
    if(this.state.filterCompanySize) {
      link = link + `&company_size_ids=[${this.state.filterCompanySize}]`;
    }
    // if(this.state.filterIndustry) {
    //   link = link + `&industry_ids=[${this.state.filterIndustry}]`;
    // }
    this.props.filterJobs(link);
  }
  resetFilters (evt) {
    evt.preventDefault();
    this.setState({
      filterJobTypeID: '',
      filterIndustry: '',
      filterCompanySize: '',
      filterOrder: '',
      filterLocation: '',
      filterCompany: '',
    });
    this.props.loadJobs();
  }
  handleLocationinput(evt) {
    evt.preventDefault();
    this.setState({
      filterLocation: evt.target.value,
    });
  }
  setIndustry(data) {
    this.setState({
      filterIndustry: data.id
    });
  }
  setSize(name, id) {
    this.setState({
      filterCompanySize: id
    });
  }
  publish(evt) {
    evt.preventDefault();
    this.props.publishUnpublish(evt.target.id, "publish", this.props.user.id);
  }
  unPublish(evt) {
    evt.preventDefault();
    this.props.publishUnpublish(evt.target.id, "unpublish", this.props.user.id);
  }
  openDelete(evt) {
    this.setState({
      deleteOpen: true,
      deleteID: evt.target.id
    });
  }
  handleDelete(evt) {
    evt.preventDefault();
    this.props.deleteJob(this.state.deleteID);
    this.setState({
      deleteOpen: false,
      deleteID: ''
    });
  }
  handleApplicationChange(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.props.getApplication(target.id);
    this.setState({
      applicationId : target.id,
      viewOpen: true,
      singleApplication: this.props.singleApplication
    });
  }
  handleCancelApplication(evt) {
    this.props.cancelApplication(this.state.applicationToBeCancelled);
    this.setState({
      cancelOpen: false,
      applicationToBeCancelled: '',
    });
  }
  viewApplications(evt) {
    evt.preventDefault();
    const target = evt.target;
    this.props.getJobApplicants(target.id);
    this.setState({
      jobId : target.id,
      viewApplicants: true,
      //singleJob: this.props.singleJob
    });
  }
  closeViewApplicants(evt) {
    this.setState({
      viewApplicants: false
    });
  }
  openViewModal (evt) {
    this.setState({
      viewOpen: true,
    });
  }
  closeViewModal () {
    this.setState({
      viewOpen: false
    });
  }
  openCancelModal (evt) {
    this.setState({
      cancelOpen: true,
      applicationToBeCancelled: evt.target.id
    });
  }
  closeCancelModal () {
    this.setState({
      cancelOpen: false,
    });
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <div id="main">
        <Header />
        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        <div className="Job-grid-container">
      { this.props.user.id ? (
        <div>
        { this.props.user.attributes.account_type === 'recruiter' ? (
          <div id="Job-Grid-Top">
            <button onClick={ this.handleSelectors } className="Job-Selector-btn" id="jobSelected" style={{cursor:'pointer'}}>
              <div id="jobSelected" className={this.state.jobSelected ? ("Selected") : (null)}> Jobs </div>
            </button>
            <button onClick={ this.handleSelectors } className="Job-Selector-btn" id="postedSelected" style={{cursor:'pointer'}}>
              <div id="postedSelected" className={this.state.postedSelected ? ("Selected") : (null)}> Posted </div>
            </button>
            <button onClick={ this.handleSelectors } className="Job-Selector-btn" id="savedSelected" style={{cursor:'pointer'}}>
              <div id="savedSelected" className={this.state.savedSelected ? ("Selected") : (null)}> Saved </div>
            </button>
          </div>

          ) : (

          <div id="Job-Grid-Top">
            <button onClick={ this.handleSelectors } className="Job-Selector-btn" id="jobSelected" style={{cursor:'pointer'}}>
              <div id="jobSelected" className={this.state.jobSelected ? ("Selected") : (null)}> Jobs </div>
            </button>
            <button onClick={ this.handleSelectors } className="Job-Selector-btn" id="applicationSelected" style={{cursor:'pointer'}}>
              <div id="applicationSelected" className={this.state.applicationSelected ? ("Selected") : (null)}> Applications </div>
            </button>
            <button onClick={ this.handleSelectors } className="Job-Selector-btn" id="savedSelected" style={{cursor:'pointer'}}>
              <div id="savedSelected" className={this.state.savedSelected ? ("Selected") : (null)}> Saved </div>
            </button>
          </div>
        )}
      </div>
      ) : ( null ) }
        <div className="Job-Filter-Box">
          <div id="Job-Filter-header">
            Filters
            <button onClick={ this.resetFilters } className="Reset-Job-Filter" style={{cursor:'pointer'}}>
              <div id="reset-job"> Reset All </div>
            </button>
          </div>
          <div id="Job-Filter-title">
            VIEW
          </div>
          <div className="Job-Filter-form" >
          <Dropdown
            title="Latest"
            list={this.state.filterItems}
            setState={this.handleFilterOrder}
            />
          </div>
          <div id="Job-Filter-title">
            Location
          </div>
          <div className="Job-Filter-form">
            <FilterCitiesSearch
              setFilterCity={this.setFilterCity}
            />
          </div>
          <div id="Job-Filter-title">
            Job Type
          </div>
          <div className="Job-Filter-form">
            <APIDropdown
              title="Full Time/Part Time/Internship..."
              list={this.props.jobTypes}
              setState={this.setFilterJobType}
            />
          </div>
          <div id="Job-Filter-title">
            Required Experience
          </div>
          <div className="Job-Filter-form">
          <Dropdown
            title="1-2 Years/3-5 Years/6-10 Years..."
            list={this.state.experienceItems}
            setState={this.handleFilterExperience}
            />
          </div>
          <div id="Job-Filter-title">
            Company Size
          </div>
          <div className="Job-Filter-form">
            <CompanySizeDropdown
              title="10-100 Employees..."
              list={this.props.sizes}
              setState={this.setSize}
            />
          </div>
          <div id="Job-Filter-title">
            Industry
          </div>
          <div className="Job-Filter-form">
          <FilterIndustry
            setState={this.setIndustry}
          />
          </div>
          <div className="Apply-Filters-btn">
            <button onClick={ this.handleFilterSubmit } className="Job-btn" aria-label="Apply Filters">
              Apply Filters
            </button>
          </div>
        </div>


        <React.Fragment>
          { this.state.jobSelected ? ( // JOBS FEED SELECTED
           <React.Fragment>
            <div className="Scroll-item">
              <ScrollButton scrollStepInPx="50" delayInMs="6.66"/>
            </div>

            { !localStorage.filter_empty && this.props.jobs.length <= 0 ? (
                <div id="loading-jobs">
                <p className="loading">Getting Jobs<span>.</span><span>.</span><span>.</span></p>
                </div>
              ) : (
          <div>
          { localStorage.filter_empty ? (
              <div id="no-filter-results">
                No results from your filters.<br />
                Try broadening your search!
              </div>) : (
              this.props.jobs.map((job) => {
              return (
                <div className="Job" key={ job.id }>
                  <Job
                    data={ job }
                    id={ job.id }
                    handler={ this.handleChange }
                    quickApply={ this.handleQuickApply }
                    openEdit={ this.openEdit }
                  />
                </div>
              );
            }) )}
            { !localStorage.filter_empty && localStorage.pageLimit >= this.state.page ? ( // LOAD MORE JOBS BUTTON
            <div id="loading-more-jobs">
              <p className="loading">Fetching more<span>.</span><span>.</span><span>.</span></p>
            </div>
          ) : (null)}
            { !localStorage.filter_empty && localStorage.pageLimit < this.state.page ?  (
            <div className="No-More-Jobs">
              Looks like that's all the jobs we have right now...
              <button onClick={ () => { this.scrollToTop(); }} className="No-More-Jobs-btn" aria-label="No More Jobs">
                Return to the top?
              </button>
            </div>
          ): (null)}
          </div>
          )}

          </React.Fragment>
          ) : (null) }
          { this.state.applicationSelected ? ( // APPLICATIONS FEED SELECTED
            <React.Fragment>
                { this.props.applications.map((application) => {
                  return (
                  <div className="Job" key={ application.id }>
                    <Application
                      data={ application }
                      id={ application.id }
                      cancelHandler={this.openCancelModal}
                      viewHandler={this.handleApplicationChange}
                      key={application.id}
                    />
                  </div>
                  )
                })}
            </React.Fragment>
          ) : (null) }

          { this.state.savedSelected ? ( // SAVED JOBS FEED
            <React.Fragment>
              {this.props.savedJobs.length > 0 ? (
                 this.props.savedJobs.map((savedJob) => {
                    return (
                      <div className="Job" key={ savedJob.id }>
                        <Saved
                          data={savedJob}
                          id={savedJob.id}
                          handler={this.handleChange}
                          unsave={this.unSave}
                        />
                      </div>
                    )
                })
              ) : (
                <div id="no-filter-results">
                You currently don’t have any saved jobs.
              </div>
              )}
              </React.Fragment>
          ) : (null) }

          { this.state.postedSelected ? ( // MY POSTED JOBS FEED (recruiter)
              <React.Fragment>
                {this.props.myJobs.length <= 0 ? (
                  <div id="no-filter-results">
                    You currently don’t have any posted jobs.
                   </div>
                ) : (null)}
                { this.props.myJobs.map((jobs) => {
                  let data = jobs.attributes;
                  if(data.publishable){
                  return (
                  <div className="MyJob" key={ jobs.id }>
                    <MyJob
                      data={ data }
                      userID={ this.state.id }
                      jobID={ jobs.id }
                      key={ jobs.id }
                      unpublish={ this.unPublish }
                      edit={ this.openEdit }
                      handleDelete={ this.openDelete }
                      viewApplications={ this.viewApplications }
                    />
                  </div>
                  ) }
                })}
                { this.props.myJobs.map((jobs) => {
                  let data = jobs.attributes;
                  if(!data.publishable){
                  return (
                  <div className="MyJob" style={{backgroundColor: '#dcdcdc'}} key={ jobs.id }>
                      <MyJobUnpublished
                        data={ data }
                        userID={ this.state.id }
                        jobID={ jobs.id }
                        key={ jobs.id }
                        publish={ this.publish }
                        edit={ this.openEdit }
                        handleDelete={ this.openDelete }
                        viewApplications={ this.viewApplications }
                      />
                    </div>
                  )}
                })}
              </React.Fragment>
          ) : (null) }

          </React.Fragment>
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
                openEdit={this.openEdit}
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
          { this.props.singleJob.id === this.state.jobId ? (
            <ApplyJob
              apply={this.handleJobApply}
              onClose={this.closeApplyModal}
            />
          ) : (
              <div id="modal-loading">
                <p className="loading">
                  <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
                </p>
              </div>
            )}
          </JobModal>
        </div>
        <div>
          <Modal // Are you sure? UNSAVE Modal
              show={this.state.openCheck}
              onClose={this.closeModal}
              className="Modal-Backdrop"
            >
            <div className="Unsave-check">
              Are you sure you want to Un-Save this job?
              <br />
              <div className="Unsave-btn">
                <button
                  id={ this.state.unSaveID }
                  className="Job-btn"
                  onClick={ this.handleUnSave }
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <div>
          <JobModal // JOBS IVE APPLIED TO
               show={this.state.viewOpen}
               onClose={this.closeViewModal}
               className="Modal-Backdrop"
             >
            { this.props.singleApplication.id ? (
              <AppliedJobView
                data={ this.props.singleApplication }
                cancel={this.openCancelModal}
                close={this.closeViewModal}
              />
            ) : (
              <div id="modal-loading">
                <p className="loading">
                  <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
                </p>
              </div>
            )}
          </JobModal>

          <JobModal   ////// R E C R U I T E R   VIEW   APPLICANTS   /////////
            show={this.state.viewApplicants}
            onClose={this.closeViewApplicants}
            className="Modal-Backdrop"
          >
          { this.props.applicants.length ? (
            <div>
              <JobApplicants
                data={ this.props.applicants }
                close={ this.closeViewApplicants }
              />
            </div>
          ) : (
              <div id="modal-loading">
                <p className="loading">
                  <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
                </p>
              </div>
            )}
          </JobModal>




          <JobModal   //////   E D I T    J   O  B    /////////
            show={this.state.editOpen}
            onClose={this.closeEdit}
            className="Modal-Backdrop"
          >
          { this.props.singleJob.id === this.state.jobId ? (
            <div>
              <EditJob
                close={this.closeEdit}
              />
            </div>
          ) : (
              <div id="modal-loading">
                <p className="loading">
                  <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
                </p>
              </div>
            )}
          </JobModal>

          <Modal // DELETE MODAL
              show={this.state.deleteOpen}
              onClose={this.closeModal}
              className="Modal-Backdrop"
            >
            <div className="Unsave-check">
              Are you sure you want to delete this job?
              <br />
              <div className="Unsave-btn">
                <button
                  id={ this.state.deleteID }
                  className="Job-btn"
                  onClick={ this.handleDelete }
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>

          <Modal   //////CANCEL MODAL MAKE SURE U WANNA CANCEL???//////////
              show={this.state.cancelOpen}
              onClose={this.closeCancelModal}
              className="Modal-Backdrop"
            >
            <div className="Resume-Skip">
             <img src={decline} alt="decline" />
             <div id="resume-skip-headline">
              Are you sure you want to cancel this application?
              <div id="resume-skip-subline">
               The job seems like a good fit!
              </div>
            </div>
            <div>
            <button
              aria-label="Back"
              className="resume-back-btn"
              type="submit"
              onClick={this.closeCancelModal}
            >
              No, I don't want to do that!
            </button>

              <button
                aria-label="Skip"
                className="resume-skip-btn"
                type="submit"
                onClick={this.handleCancelApplication}
              >
                Yes, cancel it!<br />
              </button>
               </div>
              </div>
          </Modal>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs : state.jobsList, // makes it this.props.jobs
    singleJob : state.singleJobList,
    user : state.userList,
    savedJobs: state.savedJobsList,
    sizes : state.companySizeList,
    applications: state.applicationsList,
    singleApplication : state.singleApplicationList,
    myJobs: state.myJobsList,
    published: state.myJobsList,
    jobTypes : state.jobTypeList,
    applicants: state.applicantsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadJobTypes: () => {
      dispatch(loadJobTypes())
    },
    loadJobs: () => {
      dispatch(loadJobs());
    },
    getSavedJobs: () => {
      dispatch(getSavedJobs());
    },
    getMyJobs: (id) => {
      dispatch(getMyJobs(id));
    },
    loadMoreJobs: (page) => {
      dispatch(loadMoreJobs(page));
    },
    loadSingleJob: (id) => {
      dispatch(loadSingleJob(id));
    },
    getUser: (id) => {
      dispatch(getUser(id));
    },
    saveJob: (id) => {
      dispatch(saveJob(id));
    },
    removeSavedJob: (id) => {
      dispatch(removeSavedJob(id));
    },
    getCompanySizes: () => {
      dispatch(getCompanySizes())
    },
    getMyApplications: () => {
      dispatch(getMyApplications());
    },
    cancelApplication: (id) => {
      dispatch(cancelApplication(id));
    },
    getApplication: (id) => {
      dispatch(getApplication(id));
    },
    filterJobs: (order) => {
      dispatch(filterJobs(order));
    },
    publishUnpublish: (id, action, userID) => {
      dispatch(publishUnpublish(id, action, userID));
    },
    deleteJob: (id, userID) => {
      dispatch(deleteJob(id, userID));
    },
    getJobApplicants: (id) => {
      dispatch(getJobApplicants(id));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsFeed);