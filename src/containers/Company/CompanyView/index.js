import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, Flip } from "react-toastify";
import {
  getEmployees,
  getJobsByCompany,
  getRatings,
  addUserRating,
  getSingleCompany,
  getMyCompanies,
  getCompanyAdmins
  } from '../../../actions/company.actions';
import {
    loadSingleJob,
    saveJob,
  } from '../../../actions/job.actions';

import { followUserConnections, getConnections } from '../../../actions/connection.actions';
import Header from '../../../components/Header.js';
import JobModal from '../../Job/JobApplyModal';
import EditCompany from '../EditCompany';
import RateCompany from '../RateCompany';
import SubmitRateCompany from '../SubmitRateCompany';
import AddRemoveAdmin from '../AddRemoveAdmin';
import ApplyJob from '../../Job/ApplyJob';
import Job from '../../../components/Job';
import EditJob from '../../Job/EditJob';
import JobApply from '../../../components/job.apply.components';
import Modal from '../../Modal';
import Employees from '../../../components/company.employees.components.js';
import Diversity from '../../../components/Ratings.js';
import RenderStars from '../../../components/RenderStars.js';
import Briefcase from '../../../assets/icons/Briefcase.png';
import Location from '../../../assets/icons/Location.png';
import Account from '../../../assets/icons/Account.png';
import Company from '../../../assets/icons/CompanyDefault.png';
import Edit from '../../../assets/icons/Edit.png';
import SuccessRateCompany from '../SuccessRateCompany';

class CompanyView extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobId: '',
      isOpen: false,
      loading: false,
      applyOpen: false,
      editOpen: false,
      rateOpen: false,
      openSuccessRate: false,
      jobSelected: true,
      employeesSelected: false,
      diversitySelected: false,
      openCompanyEdit: false,
      openAdminEdit: false,
      diversityStarSmall: [],
      diversityStarMedium: [],
      userRating: 0,
      diversityValue: 0
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleJobApply = this.handleJobApply.bind(this);
    this.closeApplyModal = this.closeApplyModal.bind(this);
    this.handleJobSave = this.handleJobSave.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleQuickApply = this.handleQuickApply.bind(this);
    this.unSave = this.unSave.bind(this);
    this.handleUnSave = this.handleUnSave.bind(this);
    this.handleSelectors = this.handleSelectors.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.connectWithConnections = this.connectWithConnections.bind(this);
    this.unconnectWithConnections = this.unconnectWithConnections.bind(this);
    this.openRate = this.openRate.bind(this);
    this.openSubmitRate = this.openSubmitRate.bind(this);
    this.openSuccessRate = this.openSuccessRate.bind(this);
    this.companyRating = this.companyRating.bind(this);
    this.submitCompanyRating = this.submitCompanyRating.bind(this);
    this.closeRateModal = this.closeRateModal.bind(this);
    this.closeSubmitRateModal = this.closeSubmitRateModal.bind(this);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
  }
  componentDidMount() {
    let diversity;
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      let ID = this.props.match.params.id;
      
      this.props.getEmployees(parseInt(ID));
      this.props.getJobsByCompany(parseInt(ID));
      this.props.getSingleCompany(ID);
      this.props.getMyCompanies();
      this.props.getConnections(localStorage.id);
      this.props.getRatings(parseInt(ID));     
    }
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

  openEditCompany = () => {
    this.setState({
      openCompanyEdit: true,
    });
  }
  openAdminModal = () => {
    this.props.getCompanyAdmins(parseInt(this.props.match.params.id));
    this.setState({
      openAdminEdit: true,
    });
  };
  openRate(evt){
    evt.preventDefault();
    this.props.getSingleCompany(this.props.match.params.id);
    this.setState({
      openRate: true
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
  closeEdit() {
    this.setState({
      editOpen: false,
    });
  }
  closeModal () {
    this.setState({
      isOpen: false,
      openCompanyEdit: false,
      openAdminEdit: false
    });
  }
  closeApplyModal () {
    this.setState({
      applyOpen: false
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
      this.props.getSingleCompany(this.props.match.params.id);
      this.props.getRatings(this.props.match.params.id);
    });
  }

  companyRating  (evt) {
    this.setState({ 
        userRating: parseInt(evt.target.id)
        }, function(){
          // We want to open the SubmitRateModal if a star was clicked
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
  handleJobApply(evt) {
    this.setState({
      applyOpen: true,
      isOpen: false
    });
  }
  connectWithConnections(evt){
    evt.preventDefault();
    this.props.followUserConnections(evt.target.id, 'follow');
  }
  unconnectWithConnections(evt){
    evt.preventDefault();
    this.props.followUserConnections(evt.target.id, 'unfollow');
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
    });
  }
  handleSelectors (evt) {
    this.setState({
      jobSelected: false,
      employeesSelected: false,
      diversitySelected: false,
      [evt.target.id] : true
    });
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

  render() {
    return(
      <div id="main">
        <Header />
        <ToastContainer autoClose={3000} />
        <div className="Company-grid">
          <div id="Company-Grid-Top">
            <button onClick={ this.handleSelectors } className="Company-Selector-btn" id="jobSelected" style={{cursor:'pointer'}}>
              <div id="jobSelected" className={this.state.jobSelected ? ("Selected") : (null)}> Job Postings </div>
            </button>
            <button onClick={ this.handleSelectors } className="Company-Selector-btn" id="employeesSelected" style={{cursor:'pointer'}}>
              <div id="employeesSelected" className={this.state.employeesSelected ? ("Selected") : (null)}> Employees </div>
            </button>
            <button onClick={ this.handleSelectors } className="Company-Selector-btn" id="diversitySelected" style={{cursor:'pointer'}}>
              <div id="diversitySelected" className={this.state.diversitySelected ? ("Selected") : (null)}> Diversity Rating </div>
            </button>
          </div>
        { this.props.singleCompany.length <= 0 ? (
          <div id="loading-jobs">
            <p className="loading">Loading Company<span>.</span><span>.</span><span>.</span></p>
          </div>
        ) : (
          <div className="Company-box">
            { this.props.singleCompany[0].attributes.current_user_admin && (
              <div className="Company-edit">
                <img src={ Edit } className="userProfile-icon" alt="Edit" onClick={this.openEditCompany} />
              </div>
            )}
            <div id="Company-photo">
              { this.props.singleCompany[0].attributes.photos.medium.length ? (
                <img src={ this.props.singleCompany[0].attributes.photo } alt="profile" />
              ) : (
                <img src={ Company } alt="profile" />
              ) }
            </div>
            <div id="Company-Name">
              { this.props.singleCompany[0].attributes.name }
            </div>
            <div id="Company-Type">
              { this.props.singleCompany[0].attributes.company_size }
            </div>
            <div id="Company-Rating">
                <RenderStars rating={(this.props.singleCompany[0].attributes.divercity_rating.aggregate_rating === null) ? 0 : this.props.singleCompany[0].attributes.divercity_rating.aggregate_rating } large={false} ></RenderStars> 
            </div>
            <div id="Company-Info">
              { this.props.singleCompany[0].attributes.description }
            </div>
            <div id="Company-Data">
              <img src={Briefcase} className="Company-icon" alt="Briefcase" />
              { this.props.singleCompany[0].attributes.industry }
            </div>
            <div id="Company-Data">
              <img src={Location} className="Company-icon" alt="Location" />
              { this.props.singleCompany[0].attributes.headquarters || this.props.singleCompany[0].attributes.address }
            </div>
            { this.props.singleCompany[0].attributes.current_user_admin && (
            <div id="userProfile-Data" onClick={this.openAdminModal} style={{cursor:'pointer'}}>
              <img src={Account} className="userProfile-icon" alt="manage admin" />
               Manage Admin
            </div>
            )}
          </div>
        )}

        { this.state.jobSelected && this.props.companyJobs.length <= 0 ? (
          <div id="loading-jobs" style={{width: "400px", marginLeft: "275px"}}>
            No jobs currently posted
          </div>
        ) : (
        <React.Fragment>
          { this.state.jobSelected ? ( // JOBS FEED
          <div>
            { this.props.companyJobs.map((job) => {
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
            }) }
          </div>
          ) : null }
        </React.Fragment>
        )}
        
        { this.state.employeesSelected && this.props.employees.length <= 0 ? (
          <div id="loading-jobs" style={{width: "400px", marginLeft: "275px"}}>
            No Employees currently listed
          </div>
        ) : (
        <React.Fragment>
          { this.state.employeesSelected ? ( // EMPLOYEES FEED
            <div className="Employees">
              { this.props.employees && (
                <Employees
                  data={ this.props.employees }
                  connect={ this.connectWithConnections }
                  disconnect={ this.unconnectWithConnections }
                />
              )}
            </div>
          ) : ( null )}
        </React.Fragment>
        )}

        { this.state.diversitySelected && this.props.singleCompany[0].attributes.total_divercity_rating <= 0 && !this.props.singleCompany[0].attributes.can_rate_company ? (
          <div id="loading-jobs" style={{width: "400px", marginLeft: "275px"}}>
            No diversity ratings currently posted
          </div>
        ) : (
        <React.Fragment>
          { this.state.diversitySelected ? ( // DIVERSITY RATING FEED
                <div className="Rating" > 
                
                 <Diversity
                    rating={ this.props.singleCompany[0].attributes.divercity_rating.aggregate_rating }
                    count={ this.props.singleCompany[0].attributes.divercity_rating.total_divercity_rating }
                    reviews={ this.props.reviews }
                    rate={ this.openRate }
                    userCanRate={ this.props.singleCompany[0].attributes.can_rate_company }
                  />
                </div>            
          ) : ( null ) }
        </React.Fragment>
        )} 

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
                openEdit={ this.openEdit }
              />
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

          <Modal //// EDIT COMPANY MODAL
           show={this.state.openCompanyEdit}
           //onClose={this.closeModal}
          >
           <EditCompany
            closeEditCompanyModal={ this.closeModal }
            data={this.props.singleCompany}
          />
         </Modal>

         <Modal //// EDIT COMPANY MODAL
           show={this.state.openAdminEdit}
           //onClose={this.closeModal}
          >
           <AddRemoveAdmin
            closeAdminModal={ this.closeModal }
            data={ this.props.singleCompany }
            companyID={ this.props.match.params.id }
            onClose={ this.closeModal }
          />
         </Modal>
         
        <Modal ///// RATE COMPANY MODAL
          show={this.state.openRate}
          onClose={ this.closeRateModal }
          >
          <RateCompany
            onClose={ this.closeRateModal }
            onRate={ this.companyRating }
            data={ this.props.singleCompany }
            companyID={ this.props.match.params.id }
          >
          </RateCompany>
        </Modal>

        <Modal ///// SUBMIT RATED COMPANY MODAL
          show={this.state.openSubmitRate}
          >
          <SubmitRateCompany
            onClose={ this.closeSubmitRateModal }
            submitRating={ this.submitCompanyRating }
            rating={ this.state.userRating }
            data={ this.props.singleCompany }
            companyID={ this.props.match.params.id }
          >
          </SubmitRateCompany>
        </Modal>

        <Modal ///// SUCCESSFULLY RATED COMPANY MODAL
          show={this.state.openSuccessRate}
          >
          <SuccessRateCompany
            onClose={ this.closeSuccessModal }
            //finished= { this.closeSuccess }
          >
          </SuccessRateCompany>
        </Modal>

        </div>

        </div>
      </div>

    );
  }
}
// sets store state on local props
const mapStateToProps = state => {
  return {
    companyJobs : state.singleCompanyJobList,
    employees : state.employeesList,
    reviews: state.companyRatingsList,
    singleJob : state.singleJobList,
    singleCompany : state.singleCompanyList,
    connections: state.connectionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleCompany: (id) => {
      dispatch(getSingleCompany(id));
    },
    getJobsByCompany: (id) => {
      dispatch(getJobsByCompany(id));
    },
    getEmployees: (id) => {
      dispatch(getEmployees(id));
    },
    getRatings: (id) => {
      dispatch(getRatings(id));
    },
    addUserRating: (rating, review, id) => {
      dispatch(addUserRating(rating, review, id));
    },
    loadSingleJob: (id) => {
      dispatch(loadSingleJob(id));
    },
    followUserConnections: (id, method) => {
      dispatch(followUserConnections(id, method));
    },
    saveJob: (id) => {
      dispatch(saveJob(id));
    },
    getMyCompanies: () => {
      dispatch(getMyCompanies());
    },
    getConnections: (ID) => {
      dispatch(getConnections(ID))
    },
    getCompanyAdmins: (ID) => {
      dispatch(getCompanyAdmins(ID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyView);