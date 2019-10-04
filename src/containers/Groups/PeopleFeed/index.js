import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getGroups,
    getMoreGroups,
    requestGroupAccess,
    followPeopleGroup
  } from '../../../actions/group.actions';
import {
  getUser,
  getMoreConnections,
  } from '../../../actions/user.actions';
import { loadCompaniesForPeople, loadMoreCompanies } from '../../../actions/company.actions';

import {
  getRecommendedConnections,
  followUser,
  getConnectionsRequests,
  getAllUsers,
  getMoreUsers,
  unconnectUser,
  getConnections
  } from '../../../actions/connection.actions';

import Header from '../../../components/Header';
import TrendingGroups from '../../../components/groups.Trending.components';
import PeopleCompanies from '../../../components/people.companies.components.js';
import PeopleGroups from '../../../components/people.groups.components.js';
import PeopleConnections from '../../../components/people.connections.components.js';
import UsersConnections from '../../../components/people.usersconnections.components.js';
import { ToastContainer, Flip } from "react-toastify";
import Modal from '../../Modal';

class PeopleFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupId: '',
      loading: false,
      usersPage: 1,
      groupsPage: 1,
      companyPage: 1,
      connectionsSelected: true,
      companiesSelected: false,
      groupsSelected: false,
      isOpen: false,
    };
    this.joinGroup = this.joinGroup.bind(this);
    this.requestAccess = this.requestAccess.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelectors = this.handleSelectors.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.connectWithUser = this.connectWithUser.bind(this);
    this.unconnectUser = this.unconnectUser.bind(this);
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
    this.props.loadCompaniesForPeople();
    this.props.getConnections(localStorage.id);
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
    console.log(evt.target.id);
    evt.preventDefault();
    this.props.followPeopleGroup(evt.target.id);
  }
  requestAccess(evt) {
    evt.preventDefault();
    this.props.requestGroupAccess(evt.target.id);
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
  unconnectUser(evt) {
    evt.preventDefault();
    this.props.unconnectUser(evt.target.id);
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
      this.setState({
        companyPage: this.state.companyPage + 1
      });
      this.props.loadMoreCompanies(this.state.companyPage);
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
                <React.Fragment>
                  <div className="People-Connections">
                    <UsersConnections
                      data={ this.props.userConnections }
                      connect={ this.connectWithUser }
                    />
                  </div>
                <div className="People-Connections">
                    <PeopleConnections
                      data={ this.props.allUsers }
                      connect={ this.connectWithUser }
                    />
                  </div>
                </React.Fragment>
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
                  joinGroup={ this.joinGroup }
                  requestAccess={ this.requestAccess }
                />
              </div>
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
    userConnections: state.connectionsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id));
    },
    followPeopleGroup: (id) => {
      dispatch(followPeopleGroup(id));
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
    loadCompaniesForPeople: (query) => {
      dispatch(loadCompaniesForPeople(query));
    },
    getMoreUsers: (page) => {
      dispatch(getMoreUsers(page));
    },
    getMoreGroups: (page) => {
      dispatch(getMoreGroups(page));
    },
    loadMoreCompanies: (page) => {
      dispatch(loadMoreCompanies(page));
    },
    getConnectionsRequests: (id) => {
      dispatch(getConnectionsRequests(id));
    },
    getGroups: () => {
      dispatch(getGroups());
    },
    requestGroupAccess: (id) => {
      dispatch(requestGroupAccess(id));
    },
    unconnectUser: (id) => {
      dispatch(unconnectUser(id));
    },
    getConnections: (id) => {
      dispatch(getConnections(id));
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleFeed);


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