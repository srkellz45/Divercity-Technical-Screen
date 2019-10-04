import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getGroups,
    followGroupsOnboarding,
    getMoreGroups
  } from '../../../actions/group.actions';
import {
  getUser,
  getMoreConnections,
  } from '../../../actions/user.actions';
import { loadCompanies } from '../../../actions/company.actions';

import {
  getRecommendedConnections,
  followUser,
  getConnectionsRequests,
  getAllUsers,
  getMoreUsers
  } from '../../../actions/connection.actions';

import Header from '../../../components/Header';
import TrendingGroups from '../../../components/groups.Trending.components';
import PeopleCompanies from '../../../components/people.companies.components.js';
import PeopleGroups from '../../../components/people.groups.components.js';
import PeopleConnections from '../../../components/people.connections.components.js';
import { ToastContainer, Flip } from "react-toastify";
import Modal from '../../Modal';

class GroupsFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupId: '',
      loading: false,
      usersPage: 1,
      groupsPage: 1,
      connectionsSelected: false,
      companiesSelected: false,
      groupsSelected: true,
      isOpen: false,
    };
    this.joinGroup = this.joinGroup.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelectors = this.handleSelectors.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.connectWithUser = this.connectWithUser.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.isBottom = this.isBottom.bind(this);

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

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getUser(localStorage.id);
    this.props.getConnectionsRequests(localStorage.id);
    this.props.getGroups();
    this.props.loadCompanies('a');

    this.props.getRecommendedConnections();
    this.props.getAllUsers();
    localStorage.setItem("pageLimit", 10);
    document.addEventListener('scroll', this.trackScrolling);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
    localStorage.removeItem('groupsEmpty');
    localStorage.removeItem('connectionsEmpty');
  }
  joinGroup(evt) {
    evt.preventDefault();
    this.props.followGroupsOnboarding(evt.target.id);
  }
  handleSelectors (evt) {
    this.setState({
      connectionsSelected: false,
      companiesSelected: false,
      groupsSelected: false,
      [evt.target.id] : true,
    });
    localStorage.setItem("pageLimit", 10);
  }
  connectWithUser(evt) {
    evt.preventDefault();
    this.props.followUser(evt.target.id);
  }

  // handleChange(evt) {
  //   evt.preventDefault();
  //   const target = evt.target;
  //   this.props.loadSingleJob(target.id);
  //   this.setState({
  //     jobId : target.id,
  //     isOpen: true,
  //     singleJob: this.props.singleJob
  //   });
  // }
  loadMore(evt) {

    if(this.state.connectionsSelected){
      this.setState({
        usersPage: this.state.usersPage + 1
      });
      this.props.getMoreUsers(this.state.usersPage);
    }
    if(this.state.companiesSelected){
      //this.props.getMoreCompanies(this.state.page);
    }
    if(this.state.groupsSelected){
      this.setState({
        groupsPage: this.state.groupsPage + 1
      });
      this.props.getMoreGroups(this.state.groupsPage);
    }
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

  render() {

    return(
      <div id="main">
        <Header />
        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        { this.props.allUsers.length <= 0 ? (
            <div id="loading">
            <p className="loading">Loading<span>.</span><span>.</span><span>.</span></p>
            </div>
          ) : (
        <React.Fragment>
          <div className="People-grid-container">
            <div id="People-Grid-Top">
              <button onClick={ this.handleSelectors } className="People-Selector-btn" id="connectionsSelected" style={{cursor:'pointer'}}>
                <div id="connectionsSelected" className={this.state.connectionsSelected ? ("Selected") : (null)}> Connections </div>
              </button>
              <button onClick={ this.handleSelectors } className="People-Selector-btn" id="companiesSelected" style={{cursor:'pointer'}}>
                <div id="companiesSelected" className={this.state.companiesSelected ? ("Selected") : (null)}> Companies </div>
              </button>
              <button onClick={ this.handleSelectors } className="People-Selector-btn" id="groupsSelected" style={{cursor:'pointer'}}>
                <div id="groupsSelected" className={this.state.groupsSelected ? ("Selected") : (null)}> Groups </div>
              </button>
            </div>
          </div>

        <div>
          { this.state.connectionsSelected ? ( // CONNECTIONS SELECTED
            <React.Fragment>
              { this.props.allUsers.length <= 0 ? (
                null
                ) : (
                <div className="People-Connections">
                  <PeopleConnections
                    data={ this.props.allUsers }
                    connect={ this.connectWithUser }
                  />
                </div>
              )}
              { !localStorage.connectionsEmpty ? ( // LOAD MORE connections BUTTON
              <div id="loading-more-people">
                <p className="loading">Fetching<span>.</span><span>.</span><span>.</span></p>
              </div>
              ) : (
              <div className="No-More-People">
                Looks like that's all the connections we have for you...
              </div>
              )}
            </React.Fragment>
          ) : ( null )}

          { this.state.companiesSelected ? ( // COMPANIES SELECTED
            <React.Fragment>
            { this.props.companies.length <= 0 ? (
              null
              ) : (
              <div className="People-Company">
                <PeopleCompanies
                  data={ this.props.companies }
                />
              </div>
            )}
            </React.Fragment>
          ) : (null) }

          { this.state.groupsSelected ? ( // GROUPS FEED
            <React.Fragment>
              <div className="People-Company">
                <PeopleGroups
                  data={ this.props.groups }
                />
              </div>
            { !localStorage.groupsEmpty ? ( // LOAD MORE JOBS BUTTON
            <div id="loading-more-people">
              <p className="loading">Fetching<span>.</span><span>.</span><span>.</span></p>
            </div>
            ) : (
            <div className="No-More-People">
              That's all the groups right now...
            </div>
            )}
            </React.Fragment>
          ) : (null) }
        </div>
      </React.Fragment>
      )}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups : state.groupsList, // makes it this.props.groups
    user : state.userList,
    allUsers : state.allUsersList,
    people : state.peopleList,
    companies: state.companiesList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    followGroupsOnboarding: (id) => {
      dispatch(followGroupsOnboarding(id));
    },
    getRecommendedConnections: () => {
      dispatch(getRecommendedConnections());
    },
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    followUser: (id) => {
      dispatch(followUser(id));
    },
    loadCompanies: (query) => {
      dispatch(loadCompanies(query));
    },
    getMoreUsers: (page) => {
      dispatch(getMoreUsers(page));
    },
    getMoreGroups: (page) => {
      dispatch(getMoreGroups(page));
    },
    getConnectionsRequests: (id) => {
      dispatch(getConnectionsRequests(id));
    },
    getGroups: () => {
      dispatch(getGroups());
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsFeed);


// <div className="Recommended-header" >
//                 Recommended Groups
//               </div>
//             { this.props.trending.map((group) => {
//               let groups = group.attributes;
//               return (
//                 <div className="Recommended" key={ group.id }>
//                   <TrendingGroups
//                     image={ groups.picture_main }
//                     title={ groups.title }
//                     followers={ groups.followers_count }
//                     id={ group.id }
//                     handler={this.joinGroup}
//                     following={groups.is_followed_by_current}
//                   />
//                 </div>
//               );
//             })}
//           </div>