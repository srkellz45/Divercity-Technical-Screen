import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddModal from '../AddModal';
import NewJobModal from '../NewJobModal';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';
import AddCompany from '../Company/AddCompany';
import NewJob from '../Job/NewJob';
import NewGroup from '../Groups/NewGroup';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      isOpen: false,
      page: 1,
      openCompany: false,
      openJob: false,
      openGroup: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openAddCompany = this.openAddCompany.bind(this);
    this.openNewJob = this.openNewJob.bind(this);
    this.openNewGroup = this.openNewGroup.bind(this);
  }
  openModal () {
    this.setState({
      isOpen: true,
    });
  }
  closeModal () {
    this.setState({
      isOpen: false,
      openCompany: false,
      openJob: false,
      openGroup: false,
    });
  }
  openAddCompany () {
    this.setState({
      openCompany: true,
      isOpen: false,
    });
  }
  openNewJob () {
    this.setState({
      openJob: true,
      isOpen: false,
    });
  }
  openNewGroup() {
    this.setState({
      openGroup: true,
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
          <button
            id="header-button"
            className="header-btn"
            onClick={ this.openModal }
          >
          { localStorage.role === 'hiring_manager' || 'recruiter' ? (
            <div>+ Post</div>
            ) : ( <div>+ Add</div> )
          }
          </button>

        <AddModal
          show={ this.state.isOpen }
          onClose={ this.closeModal }
          className="Modal-Backdrop"
        >
        <div className="Add-Modal-link" onClick={this.openNewJob}>
            Post a New Job
          </div>
          <hr />
          <div className="Add-Modal-link" onClick={this.openNewGroup}>
            Create a Group
          </div>
          <hr />
          <div className="Add-Modal-link" onClick={this.openAddCompany}>
           Create a Company Profile
          </div>
        </AddModal>
        <Modal //// ADD COMPANY MODAL
         show={this.state.openCompany}
         //onClose={this.closeModal}
        >
         <AddCompany
          closeNewCompanyModal={ this.closeModal } />
       </Modal>
       <NewJobModal //// DOCUMENTS / RESUME MODAL
         show={this.state.openJob}
         //onClose={this.closeModal}
        >
         <NewJob
          closeNewJobModal={this.closeModal}
         />
       </NewJobModal>
       <Modal //// DOCUMENTS / RESUME MODAL
         show={this.state.openGroup}
         //onClose={this.closeModal}
        >
         <NewGroup
          closeNewGroupModal={this.closeModal}
         />
       </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs : state.jobsList,
  }
}


export default connect(
  mapStateToProps,
  null
)(Add);

        // <NavLink to={`/topic/new/`}>
        //   <div className="Add-Modal-link">
        //     Add a New Topic
        //   </div>
        // </NavLink>