import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, Flip, toast } from "react-toastify";
import { loadOnboardingGroups, followGroupsOnboarding } from '../../../actions/group.actions';
import { getUser } from '../../../actions/user.actions';
import history from '../../../history';
import GroupOnboarding from '../../../components/onboarding.group.components.js';
import TempHeader from '../../../components/TempHeader.js';
import Modal from '../../Modal';
import check from '../../../assets/Checkmark.png';

// {url}/:id/onboarding/groups

class SelectGroups extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      groups: [],
      selectedGroupID: [],
      completedModal: false,
      showMore: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleMoreGroups = this.toggleMoreGroups.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0,0);
    this.props.loadOnboardingGroups();
    this.props.getUser(this.state.id);
    localStorage.removeItem('skipped');
  }

  handleSelect(evt) {
    const { id } = evt.target;
    let groupID = parseInt(id);
    this.setState({ selectedGroupID: [ ...this.state.selectedGroupID, groupID ] });
    this.props.followGroupsOnboarding([groupID], this.state.id);
  }
  handleUnselect(evt) {
    const { id } = evt.target;
    let groupID = parseInt(id);
    let { selectedGroupID } = this.state;
    selectedGroupID = this.state.selectedGroupID.filter(el => el !== groupID);
    this.setState(
      { selectedGroupID }, () => console.log(this.state.selectedGroupID)
    );
  }
  handleSubmit(evt){
    evt.preventDefault();
    if (this.state.selectedGroupID.length >= 2) { // they gotta pick 2 groups
      //this.props.followGroupsOnboarding(this.state.selectedGroupID, this.state.id);
      this.setState({
        completedModal: true
      });
    } else {
      toast.error(`Please select at least 2 groups!`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  findSelectedID(id) {
    return id === this.state.selectedGroupID;
  }

  closeModal () {
    this.setState({
      completedModal: false,
    });
    history.push(`/${localStorage.id}/user/`);
  }
  toggleMoreGroups(evt) {
    evt.preventDefault();
    this.setState({
      showMore: !this.state.showMore,
    });
  }
  render() {
    console.log(this.props.groups.slice(0, 6));
    console.log(this.props.groups.slice(6));

    return (
      <div className="OnboardingGroup">
        <TempHeader />
        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        <div className="OnboardingGroup-body">
          <div className="OnboardingGroup-headline">
            Last step! Follow 2 or more groups
            <button
              aria-label="Save Resume"
              type="submit"
              onClick={this.toggleMoreGroups}
            >
              More Groups
            </button>
            <div className="OnboardingGroup-subline">
              This will help us find the most relevant connections & opportunities for you.
            </div>
          </div>
          <div className="OnboardingGroup-wrapper">
          { !this.state.showMore && (
            <React.Fragment>
            { this.props.groups.slice(0, 6).map(group => {
                return (
                  <GroupOnboarding
                    title={ group.attributes.title }
                    picture={ group.attributes.picture_main }
                    id={ group.id }
                    select={ this.handleSelect }
                    deselect={ this.handleUnselect }
                    state={ this.state.selectedGroupID }
                    key={ group.id }
                  />
                );
              })
            }
            </React.Fragment>
          )}
            { this.state.showMore && (
              <React.Fragment>
              { this.props.groups.slice(6).map(group => {
                  return (
                    <GroupOnboarding
                      title={ group.attributes.title }
                      picture={ group.attributes.picture_main }
                      id={ group.id }
                      select={ this.handleSelect }
                      deselect={ this.handleUnselect }
                      state={ this.state.selectedGroupID }
                      key={ group.id }
                    />
                  );
                })
              }
              </React.Fragment>
            )}
            <button className="OnboardingGroup-btn" onClick={this.handleSubmit}>
              Done
            </button>
          </div>
            <Modal   ////// ONBOARDING SUCCESS MODAL //////////
              show={this.state.completedModal}
              onClose={this.closeModal}
              className="Modal-Backdrop"
            >
            <div className="Resume-Success">
              <img src={check} alt="check" />
              { localStorage.type === "job_seeker" || localStorage.type === "professional" || localStorage.type === "entrepreneur" ? (
                <div>
                <div id="resume-success-headline">
                   Congratulations!
                   <div id="resume-success-subline">
                     You can now start making meaningful connections and browsing <br />
                     jobs. Complete your user profile in the next section.
                   </div>
                 </div>
                <NavLink to={`/${localStorage.id}/user/`} alt="ok" aria-label="ok">
                  <button
                    aria-label="Save Resume"
                    className="resume-success-btn"
                    type="submit"
                    onClick={this.closeModal}
                  >
                    Let's do this!
                  </button>
                 </NavLink>
                </div>
                ) : (null)
              }
              { localStorage.type === "recruiter" || localStorage.type === "hiring_manager" ? (
                <div>
                <div id="resume-success-headline">
                   Congratulations!
                   <div id="resume-success-subline">
                     You can now start making meaningful connections and posting <br />
                     jobs. Post your first job in the next section.
                   </div>
                 </div>
                <NavLink to={`/${localStorage.id}/user/`} alt="ok" aria-label="ok">
                  <button
                    aria-label="Save Resume"
                    className="resume-success-btn"
                    type="submit"
                    onClick={this.closeModal}
                  >
                    Let's do this!
                  </button>
                 </NavLink>
                </div>
                ) : (null)
              }
              { localStorage.type === "student" ? (
                <div>
                <div id="resume-success-headline">
                   Congratulations!
                   <div id="resume-success-subline">
                     You can now start making meaningful connections and browsing <br />
                     jobs. Complete your user profile in the next section.
                   </div>
                 </div>
                <NavLink to={`/${localStorage.id}/user/`} alt="ok" aria-label="ok">
                  <button
                    aria-label="Save Resume"
                    className="resume-success-btn"
                    type="submit"
                    onClick={this.closeModal}
                  >
                    Let's do this!
                  </button>
                 </NavLink>
                </div>
                ) : (null)
              }
              </div>
            </Modal>
        </div>
        { localStorage.type === "student" ? (
          <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/info/3`} alt="Back">
                Back
              </NavLink>
            </div>
        ) : null }
        { localStorage.type === "job_seeker" ? (
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/info/3`} alt="Back">
                Back
              </NavLink>
            </div>
        ) : null }
        { localStorage.type === "entrepreneur" ? (
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/info/3`} alt="Back">
                Back
              </NavLink>
            </div>
        ) : null }
        { localStorage.type === "professional" ? (
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/info/1`} alt="Back">
                Back
              </NavLink>
            </div>
        ) : null }
        { localStorage.type === "hiring_manager" ? (
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/info/2`} alt="Back">
                Back
              </NavLink>
            </div>
        ) : null }
        { localStorage.type === "recruiter" ? (
            <div className="Back">
              <NavLink to={`/${this.state.id}/onboarding/info/2`} alt="Back">
                Back
              </NavLink>
            </div>
        ) : null }
        <div className="progress-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="greydot"></span>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    groups : state.groupsList, // makes it this.props.groups
    user : state.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOnboardingGroups: () => {
      dispatch(loadOnboardingGroups());
    },
    followGroupsOnboarding: (groupIDs, ID) => {
      dispatch(followGroupsOnboarding(groupIDs, ID))
    },
    getUser: (ID) => {
      dispatch(getUser(ID))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectGroups);

