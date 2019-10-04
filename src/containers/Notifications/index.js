import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header';

import { getActivities, markReadActivities } from '../../actions/notification.actions';
import { acceptConnection } from '../../actions/connection.actions';
import {
  getGroupRequests,
  getGroupInvites,
  acceptPrivateGroupRequest,
  declinePrivateGroupRequest
} from '../../actions/group.actions';

import Accept from '../../assets/icons/Accept_Filled.png';
import Decline from '../../assets/icons/Decline_Red.png';


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: props.notificationsList,
      notificationIDs: [],
      notificationsSelected: true,
      groupRequestsSelected: false,
    };
    this.handleSelectors = this.handleSelectors.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
    this.connect = this.connect.bind(this);
    this.declineConnect = this.declineConnect.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getActivities();
    this.props.getGroupRequests();
    this.props.getGroupInvites();
  }
  handleSelectors (evt) {
    this.setState({
      notificationsSelected: false,
      groupRequestsSelected: false,
      [evt.target.id] : true
    });
  }
  acceptRequest (evt) {
    evt.preventDefault();
    this.props.acceptPrivateGroupRequest(evt.target.name, evt.target.id);
  }
  declineRequest (evt) {
    evt.preventDefault();
    this.props.declinePrivateGroupRequest(evt.target.name, evt.target.id);
  }
  connect(evt) {
    evt.preventDefault();
    this.props.acceptConnection(evt.target.id, localStorage.id);
  }
  declineConnect(evt) {
    evt.preventDefault();
  }
  render() {
    return (
      <div id="main">
        <Header />
        <div className="Notification-Body">
          <div id="Notification-Selectors">
            <button onClick={ this.handleSelectors } className="Notification-Selector-btn" id="notificationsSelected" style={{cursor:'pointer'}}>
              <div id="notificationsSelected" className={this.state.notificationsSelected ? ("Selected") : (null)}>Notifications</div>
            </button>
            <button onClick={ this.handleSelectors } className="Notification-Selector-btn" id="groupRequestsSelected" style={{cursor:'pointer'}}>
              <div id="groupRequestsSelected" className={this.state.groupRequestsSelected ? ("Selected") : (null)}>Group Requests</div>
            </button>
          </div>
          { !this.props.notifications.length ? (
            <div id="loading-notifications">
            <p className="loading">Getting Notifications<span>.</span><span>.</span><span>.</span></p>
            </div>
            ) : (
            <div>
              { this.state.notificationsSelected ? ( // NOTIFICATIONS
                <React.Fragment>
                { this.props.notifications.map((notification) => {
                  let data = notification.attributes;
                  let Message;
                  Message = data.message.split("</b>")[1];
                  return(
                      <div className="AllNotification-container" key={this.props.notifications.id}>
                        <div className="AllNotification-item">
                          <div className="AllNotification-image">
                            <NavLink to={`/users/${data.last_active_user_info.id}`}>
                              <img src={data.last_active_user_info.avatar_thumb} alt="User Photo" />
                            </NavLink>
                          </div>
                          <div className="AllNotification-title">
                          <NavLink to={`/users/${data.last_active_user_info.id}`}>
                            <b>{data.last_active_user_info.name} </b>
                          </NavLink>
                            {Message}
                            <div className="AllNotification-date">
                             {data.updated_ago_in_words} ago
                            </div>
                          </div>
                          { data.a_type === "follow" ? (
                          <div className="GroupNotification-icons">
                            <img src={Accept} className="Company-connected-icon" alt="Connect" id={ data.last_active_user_info.id } name={data.last_active_user_info.id} onClick={ this.connect } />
                            <img style={{marginLeft: "15px"}} src={Decline} className="Company-connected-icon" alt="Connect" id={ data.last_active_user_info.id } name={data.last_active_user_info.id} onClick={ this.declineConnect } />
                          </div>
                          ) : null }
                        </div>
                      </div>
                    )
                  })}
              </React.Fragment>
              ) : null }

              { this.state.groupRequestsSelected ? ( // NOTIFICATIONS
                <React.Fragment>
                { this.props.requests.map((request) => {
                  return(
                    <div className="AllNotification-container" key={this.props.requests.id}>
                      <div className="AllNotification-item">
                        <div className="AllNotification-image">
                          <NavLink to={`/users/${request.attributes.user_id}`}>
                            <img src={request.attributes.user_info.avatar_thumb} alt="User Photo" />
                          </NavLink>
                        </div>
                        <div className="GroupNotification-title">
                        <NavLink to={`/users/${request.attributes.user_id}`}>
                          <b>{request.attributes.user_info.name} </b>
                        </NavLink>
                          requested to join &nbsp;
                        <NavLink to={`/groups/${request.attributes.group_info.id}`}>
                          <b>{request.attributes.group_info.title}</b>
                        </NavLink>
                          <div className="AllNotification-date">
                           { Moment(request.attributes.created_at).fromNow() }
                          </div>
                        </div>
                        <div className="GroupNotification-icons">
                          <img src={Accept} className="Company-connected-icon" alt="Connect" id={ request.attributes.user_id } name={request.attributes.group_info.id} onClick={ this.acceptRequest } />
                          <img style={{marginLeft: "15px"}} src={Decline} className="Company-connected-icon" alt="Connect" id={ request.attributes.user_id } name={request.attributes.group_info.id} onClick={ this.declineRequest } />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </React.Fragment>
              ) : null }
          </div>
          )}
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications : state.allNotificationsList,
    recentNotifications: state.notificationsList,
    requests : state.groupRequestsList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getActivities: () => {
      dispatch(getActivities());
    },
    getGroupRequests: () => {
      dispatch(getGroupRequests());
    },
    getGroupInvites: () => {
      dispatch(getGroupInvites());
    },
    markReadActivities: (id) => {
      dispatch(markReadActivities(id));
    },
    acceptPrivateGroupRequest: (groupID, userID) => {
      dispatch(acceptPrivateGroupRequest(groupID, userID));
    },
    declinePrivateGroupRequest: (groupID, userID) => {
      dispatch(declinePrivateGroupRequest(groupID, userID));
    },
    acceptConnection: (userID, myID) => {
      dispatch(acceptConnection(userID, myID));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
