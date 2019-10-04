import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { NavLink } from 'react-router-dom';
import { ToastContainer, Flip, toast } from "react-toastify";
import Dropzone from 'react-dropzone';
import { getUser } from '../../../actions/user.actions';
import {
 loadFollowingGroups,
 loadSingleGroup,
 loadQuestionsByGroup,
 loadGroupAdmins,
 loadGroupMembers,
 loadRecommendedGroups,
 followGroup,
 followRecommendedGroups,
 editGroup,
 requestGroupAccess,
 leaveGroup,
 setGroupAdmin,
 getGroupRequests,
 getGroupInvites,
 acceptPrivateGroupRequest,
 declinePrivateGroupRequest
} from '../../../actions/group.actions.js';
import { addSingleGroupReply, addNewQuestion, getSingleQuestion, editQuestion, deleteQuestion } from '../../../actions/question.actions';
import { getConnections, followUser } from '../../../actions/connection.actions.js';
import EditGroup from '../EditGroup';
import Header from '../../../components/Header.js';
import Modal from '../../Modal';
import EditQuestionModal from '../../EditQuestionModal';
import NewGroup from '../NewGroup';
import SingleGroupQuestion from '../../../components/singleGroup.question.components.js';
import GroupMembers from '../../../components/singleGroup.members.components.js';
import AdminMembers from '../../../components/singleGroup.admin.components.js';
import MemberIcons from '../../../components/singleGroup.MainMembers.components.js';
import GroupRecommendations from '../../../components/singleGroup.groupRecommendations.components.js';
import MainGroupRecommendations from '../../../components/singleGroup.mainGroupRec.components.js';
import Edit from '../../../assets/icons/Edit.png';
import PublicIcon from '../../../assets/icons/PublicIcon.png';
import MoreMembers from '../../../assets/icons/MoreMembers.png';
import StartDiscussion from '../../../assets/icons/StartDiscussion.png';
import Photo from '../../../assets/icons/image.png';

import Checkmark from '../../../assets/Checkmark.png';
import Decline from '../../../assets/Decline.png';
  // {{url}}/groups/:id/

class SingleGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      group_ID: this.props.match.params.id,
      isOpen: false,
      openEdit: false,
      openRequests: false,
      openGroup: false,
      openDropdown: false,
      reply: {
        id: '',
        data: '',
      },
      otherReply: '',
      firstReply: '',
      questionID: '',
      aboutSelected: true,
      discussionSelected: false,
      membersSelected: false,
      recommendationsSelected: false,
      showGroupLeaveDropdown: false,
      files: '',
      imageFile: '',
      deleteQuestion: false,
      questionToBeDeleted: '',
      editTopic: false,
      topic: '',
      deleteCheck: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.addReply = this.addReply.bind(this);
    this.handleReplyInput = this.handleReplyInput.bind(this);
    this.handleFirstReplyInput = this.handleFirstReplyInput.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.rejoinGroup = this.rejoinGroup.bind(this);
    this.joinRecGroup = this.joinRecGroup.bind(this);
    this.requestAccess = this.requestAccess.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.showRequests = this.showRequests.bind(this);
    this.handleSelectors = this.handleSelectors.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
    this.handleTopicInput = this.handleTopicInput.bind(this);
    this.openNewGroup = this.openNewGroup.bind(this);
    this.connectWithUser = this.connectWithUser.bind(this);
    this.showGroupLeaveDropdown = this.showGroupLeaveDropdown.bind(this);
    this.closeGroupLeaveDropdown = this.closeGroupLeaveDropdown.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.openDeleteQuestion = this.openDeleteQuestion.bind(this);
    this.deleteCheck = this.deleteCheck.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.editTopic = this.editTopic.bind(this);
    this.handleQuestionEdit = this.handleQuestionEdit.bind(this);

  }
  openModal (evt) {
    this.setState({
      isOpen: true,
    });
  }
  closeModal (evt) {
    this.setState({
      isOpen: false,
      openEdit: false,
      openGroup: false,
      openRequests: false,
      editTopic: false,
      deleteCheck: false,
    });
  }
  openEdit (evt) {
    evt.preventDefault();
    this.setState({
      openEdit: true,
    });
  }
  showRequests(evt) {
    evt.preventDefault();
    this.props.getGroupRequests();
    this.props.getGroupInvites();
    this.setState({
      openRequests: true,
    });
  }
  componentDidMount() {
  window.scrollTo(0,0);
    this.props.loadSingleGroup(this.state.group_ID);
    this.props.loadQuestionsByGroup(this.state.group_ID);
    this.props.loadGroupAdmins(this.state.group_ID);
    this.props.loadGroupMembers(this.state.group_ID);
    this.props.getUser(localStorage.id);
    this.props.loadRecommendedGroups();
    this.props.getConnections(localStorage.id);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeGroupLeaveDropdown);
    document.removeEventListener('click', this.closeDropdown);
  }
  addReply(evt) {
    evt.preventDefault();
    let reply = this.state.reply;
    this.props.addSingleGroupReply(reply.data, reply.id, this.state.group_ID);
    this.setState({
      reply: {
        id: '',
        data: '',
      },
      otherReply: '',
      firstReply: '',
    });
  }
  handleReplyInput(evt) {
    evt.preventDefault();
    this.setState({
      reply: {
        data: evt.target.value,
        name: evt.target.name,
        id: evt.target.id
      },
    });
  }
  handleFirstReplyInput(evt) {
    evt.preventDefault();
    this.setState({
      firstReply: (evt.target.value),
      questionID: (evt.target.id)
    });
  }
  joinGroup(evt) {
    evt.preventDefault();
    this.props.followGroup(evt.target.id);
  }
  rejoinGroup(evt) {
    evt.preventDefault();
    this.props.acceptPrivateGroupRequest(evt.target.id, localStorage.id);
  }
  joinRecGroup(evt) {
    evt.preventDefault();
    this.props.followRecommendedGroups(evt.target.id);
  }
  leaveGroup(evt) {
    evt.preventDefault();
    this.props.leaveGroup(this.state.group_ID);
  }
  requestAccess(evt) {
    evt.preventDefault();
    this.props.requestGroupAccess(this.state.group_ID);
  }
  handleSelectors (evt) {
    this.setState({
      aboutSelected: false,
      discussionSelected: false,
      membersSelected: false,
      recommendationsSelected: false,
      [evt.target.id] : true
    });
  }
  handleTopicInput(evt) {
    evt.preventDefault();
    this.setState({
      newTopic: evt.target.value
    });
  }
  addNewTopic(evt) {
    evt.preventDefault();
    if(this.state.newTopic) {
      if(this.state.newTopic.length > 5) {
        this.props.addNewQuestion(this.state.newTopic, this.state.group_ID, this.state.imageFile);
        this.setState({
          newTopic: '',
          files: []
        });
      } else {
        toast.error(`Please make your topic longer than 5 characters`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    } else {
        toast.error(`Please make sure you include a topic!`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
  }
  openNewGroup(evt) {
    evt.preventDefault();
    this.setState({
      openGroup: true
    });
  }
  connectWithUser(evt) {
    evt.preventDefault();
    this.props.followUser(evt.target.id);
  }
  showGroupLeaveDropdown(evt) {
    evt.preventDefault();
    this.setState({ showGroupLeaveDropdown: true }, () => {
      document.addEventListener('click', this.closeGroupLeaveDropdown);
    });
  }
  closeGroupLeaveDropdown() {
    this.setState({
      showGroupLeaveDropdown: false
    }, () => {
      document.removeEventListener('click', this.closeGroupLeaveDropdown);
    });
  }
  openDropdown (evt) {
    evt.preventDefault();
    this.setState({
      openDropdown: true,
    }, () => {
      document.addEventListener('click', this.closeDropdown);
    });
  }
  closeDropdown() {
    this.setState({
      openDropdown: false,
      deleteQuestion: false,
      topic: '',
    }, () => {
      document.removeEventListener('click', this.closeDropdown);
    });
  }
  uploadFile(evt) {
    if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var files = e.target.result;
        //resize image
        var img = document.createElement("img");
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let MAX_WIDTH = 160;
          let MAX_HEIGHT = 160;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);    
          let dataUrl = canvas.toDataURL("image/png");   
          this.setState({
            imageFile: dataUrl
          });
        }
        img.src = e.target.result;

      };
    reader.readAsDataURL(evt.target.files[0]);
   }
  }
  onDrop(files) {
    this.setState({
      files: files.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
        size: file.size,
      }))
    });
  }
  deletePhoto (evt) {
    evt.preventDefault();
    this.setState({
      files: []
    })
  }
  openDeleteQuestion(evt) {
    evt.preventDefault();
    this.props.getSingleQuestion(evt.target.id);
    this.setState({
      deleteQuestion: true,
      questionToBeDeleted: evt.target.id
    }, () => {
      document.addEventListener('click', this.closeDropdown);
    });
  }
  deleteCheck(evt) {
    evt.preventDefault();
    this.setState({
      deleteCheck: true,
    });
  }
  handleDeleteQuestion(evt) {
    evt.preventDefault();
    let groupID = parseInt(this.props.singleQuestion.attributes.group[0].id);
    let questionID = parseInt(this.state.questionToBeDeleted);
    this.props.deleteQuestion(questionID, groupID, 'singleGroup');
    this.setState({
      deleteCheck: false,
    });
  }
  editQuestion(evt) {
    evt.preventDefault();
    this.setState({
      editTopic: true,
    });
  }
  editTopic(evt) {
    this.setState({
      topic: evt.target.value
    });
  }
  closeBanner(evt) {
    evt.preventDefault();
    localStorage.setItem('hasPostedJob', true);
    this.setState({
      showBanner: false
    });
  }
  handleQuestionEdit(evt) {
    evt.preventDefault();
    let questionData = { "question": { "question_type": "topic" } };
    let groupArrayID = [];
    let groupID = parseInt(this.props.singleQuestion.attributes.group[0].id);
    let questionID = parseInt(this.state.questionToBeDeleted);
    groupArrayID.push(JSON.parse(groupID));

    if(this.state.topic) {
      Object.assign(questionData.question, {text: this.state.topic});
    }
    if(this.state.description) {
      Object.assign(questionData.question, {description: this.state.description});
    }
    Object.assign(questionData.question, {group_of_interest_ids: groupArrayID});
    this.props.editQuestion(questionData, questionID, groupID, "singleGroup");
    this.setState({
      editTopic: false,
    })
  }
  render() {
    return(
      <div className="feed">
        <Header />
         <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        <div className="user-view">
          { this.props.singleGroup.length <= 0 ? (
            <div id="loading">
              <p className="loading">Getting Group<span>.</span><span>.</span><span>.</span></p>
            </div>
          ) : ( // once it's done loading....
          <React.Fragment>
            <div className="Single-Group-body">
              <div className="NewTopic-community-logo">
                <img src={this.props.singleGroup.attributes.picture_main} alt="Community" />
              </div>
            <div className="single-Group-top">
              <div className="single-Group-Title">
                {this.props.singleGroup.attributes.title}
              </div>
              <div className="single-Group-Followers">
                {this.props.singleGroup.attributes.group_type} &#183; {this.props.singleGroup.attributes.followers_count} members
              </div>

              { this.props.singleGroup.attributes.group_type.toLowerCase() === "private" ? ( // if the group is private
                <React.Fragment>
                  { !this.props.singleGroup.attributes.is_followed_by_current ? ( // if user isn't following group, show button
                    <React.Fragment>
                    { this.props.singleGroup.attributes.request_to_join_status === "pending" && (
                      <div id="single-Group-btn">
                        <button
                          id={ this.props.singleGroup.id }
                          className="single-Group-pending-btn"
                          >
                          Request Pending
                        </button>
                      </div>
                    )}
                    { this.props.singleGroup.attributes.request_to_join_status === "accepted" && (
                      <div id="single-Group-btn">
                          <button
                              id={ this.props.singleGroup.id }
                              onClick={ this.rejoinGroup }
                              className="single-Group-btn"
                            >
                            Rejoin Group
                          </button>
                        </div>
                    )}
                    { this.props.singleGroup.attributes.request_to_join_status === "none" && (
                      <div id="single-Group-btn">
                          <button
                              id={ this.props.singleGroup.id }
                              onClick={ this.requestAccess }
                              className="single-Group-btn"
                            >
                            Request Access
                          </button>
                        </div>
                    )}
                    </React.Fragment>
                  ) : (
                  <div id="single-Group-btn">
                    <button
                        id={ this.props.singleGroup.id }
                        className="single-Group-member-btn"
                        onClick={ this.leaveGroup }
                      >
                      <span>Member</span>
                    </button>
                  </div>
                  ) }
                  { this.props.singleGroup.attributes.is_current_user_admin ? (
                  <React.Fragment>
                    <button
                      id="single-Group-edit"
                      onClick={this.openDropdown}
                    >
                    &bull;&bull;&bull;&nbsp;&nbsp; More
                    </button>
                     {this.state.openDropdown && (
                      <div className="single-Group-dropdown">
                        <div id="single-Group-dropdown-item">Add Members</div>
                        <div id="single-Group-dropdown-item" onClick={this.showRequests}>Join Requests</div>
                        <div id="single-Group-dropdown-item" onClick={this.openEdit}>Edit Group</div>
                      </div>
                      )}
                  </React.Fragment>
                  ) : null }
                </React.Fragment>
              ) : ( // if the group is PUBLIC
                <React.Fragment>
                  { !this.props.singleGroup.attributes.is_followed_by_current ? ( // if user isn't following group, show button
                    <div id="single-Group-btn">
                      <button
                          id={ this.props.singleGroup.id }
                          onClick={ this.joinGroup }
                          className="single-Group-btn"
                        >
                        Join
                      </button>
                    </div>
                  ) : (
                  <div id="single-Group-btn">
                    <button
                      id={ this.props.singleGroup.id }
                      className="single-Group-member-btn"
                      onClick={ this.leaveGroup }
                    >
                    <span>Member</span>
                    </button>
                  </div>
                  ) }
                  { this.props.singleGroup.attributes.is_current_user_admin ? (
                  <React.Fragment>
                    <button
                      id="single-Group-edit"
                      onClick={this.openDropdown}
                    >
                    &bull;&bull;&bull;&nbsp;&nbsp; More
                    </button>
                     {this.state.openDropdown && (
                      <div className="single-Group-dropdown">
                        <div id="single-Group-dropdown-item">Add Members</div>
                        <div id="single-Group-dropdown-item" onClick={this.showRequests}>Join Requests</div>
                        <div id="single-Group-dropdown-item" onClick={this.openEdit}>Edit Group</div>
                      </div>
                      )}
                  </React.Fragment>
                  ) : null }
                </React.Fragment>
              )}
            </div>

          { this.state.recommendationsSelected ? ( null ) : (
            <React.Fragment>
              <div className="single-Group-right-container">
                <div className="single-Group-new-group">
                  <div id="single-Group-new-group-title">
                    Create New Group
                  </div>
                  <div id="single-Group-new-group-bio">
                    Create your own group, share everything easier with connections.
                  </div>
                  <div id="single-Group-new-group-btn">
                    <button
                      id={ this.props.singleGroup.id }
                      className="single-Group-new-group-btn"
                      onClick={ this.openNewGroup }
                    >
                    Create Group
                    </button>
                  </div>
                </div>
                <div className="single-Group-right-rec-groups">
                  <div id="single-Group-right-rec-groups-title">
                      Suggested Groups
                  </div>
                  <MainGroupRecommendations
                    data={this.props.recommendedGroups}
                    handler={this.joinRecGroup}
                   />
                  <div className="single-Group-all-rec-groups" onClick={this.handleSelectors} id="recommendationsSelected">
                    See More
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}



            <div id="single-Group-Selectors">
              <button onClick={ this.handleSelectors } className="single-Group-Selector-btn" id="aboutSelected" style={{cursor:'pointer'}}>
                <div id="aboutSelected" className={this.state.aboutSelected ? ("Selected") : (null)}>About</div>
              </button>
              { this.props.singleGroup.attributes.group_type.toLowerCase() === "private" && !this.props.singleGroup.attributes.is_followed_by_current ? (
                  null
              ) : (
              <button onClick={ this.handleSelectors } className="single-Group-Selector-btn" id="discussionSelected" style={{cursor:'pointer'}}>
                <div id="discussionSelected" className={this.state.discussionSelected ? ("Selected") : (null)}>Discussion</div>
              </button>
              )}
              <button onClick={ this.handleSelectors } className="single-Group-Selector-btn" id="membersSelected" style={{cursor:'pointer'}}>
                <div id="membersSelected" className={this.state.membersSelected ? ("Selected") : (null)}>Members</div>
              </button>
              <button onClick={ this.handleSelectors } className="single-Group-Selector-btn" id="recommendationsSelected" style={{cursor:'pointer'}}>
                <div id="recommendationsSelected" className={this.state.recommendationsSelected ? ("Selected") : (null)}>Recommendations</div>
              </button>
            </div>

          { this.state.aboutSelected ? ( // ABOUT THE GROUP
            <React.Fragment>
              <div className="single-Group-Main">
                <div className="single-Group-About">
                  About This Group
                  <hr />
                </div>
                <React.Fragment>
                  { this.props.singleGroup.attributes.description ? (
                    <div className="single-Group-description-title">
                      Description
                      <div className="single-Group-description">
                        {this.props.singleGroup.attributes.description}
                      </div>
                    </div>
                   ) : ( null )}
                </React.Fragment>
                <br />

                  <div className="single-Group-description-title">
                    Group Type
                    { this.props.singleGroup.attributes.group_type.toLowerCase() === "public" ? (
                      <div className="single-Group-type">
                        <img src={ PublicIcon } className="single-Group-icon" alt="public" />
                        <div id="single-Group-type-title"> Public Group
                          <br />
                          <div id="single-Group-type-details">
                            Anyone is open to join this group, view posts and add replies.
                          </div>
                        </div>
                      </div>
                    ) : ( null ) }
                    { this.props.singleGroup.attributes.group_type.toLowerCase() === "private" ? (
                      <div className="single-Group-type">
                        <img src={ PublicIcon } className="single-Group-icon" alt="public" />
                        <div id="single-Group-type-title"> Private Group
                          <br />
                          <div id="single-Group-type-details">
                            You must request access to view.
                          </div>
                        </div>
                      </div>
                    ) : ( null ) }
                  </div>
                  <div className="single-Group-members">
                    <div className="single-Group-members-title">
                      Members <strong>&#183;</strong> {this.props.singleGroup.attributes.followers_count}
                    </div>
                    <hr />
                    <React.Fragment>
                      { this.props.members.length ? (
                        <div className="single-Group-members-container">
                          <MemberIcons
                            data={this.props.members}
                          />
                          <div className="Group-Members-icon">
                            <div id="Group-Members-profile-photo" style={{cursor:"pointer"}}>
                              <img src={MoreMembers} alt="More" onClick={ this.handleSelectors } id="membersSelected"  />
                            </div>
                          </div>
                        </div>
                      ) : null }
                    </React.Fragment>

                      { this.props.admins.length ? (
                      <React.Fragment>
                        <div className="single-Group-Admin-Headline">
                          Admin
                        </div>
                        <div className="single-Group-Admin-Container">
                          { this.props.admins.slice(0, 6).map((admin) => {
                            return (
                              // add unique key attribute to each a tag
                              <a key={admin.id} href={`/users/${admin.id}`}>
                                <div className="single-Group-Admin-image">
                                  <img src={admin.attributes.avatar_thumb} alt="Admin" />
                                </div>
                                <div className="single-Group-Admin" >
                                  {admin.attributes.name}
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </React.Fragment>
                      ) : null }
                    <hr />
                    <div className="single-Group-all-members" onClick={this.handleSelectors} id="membersSelected">
                      See All Members
                    </div>
                  </div>
                { this.props.singleGroup.attributes.group_type.toLowerCase() === "private" && !this.props.singleGroup.attributes.is_followed_by_current ? (
                  null
                ) : (
                <React.Fragment>
                  { this.props.groupQuestions.length ? (
                  <React.Fragment>
                    <div className="single-Group-About" style={{paddingTop: "15px"}}>
                      Recent Posts
                      <hr />
                    </div>
                    <div className="Single-Group-topic-body">
                      { this.props.groupQuestions.slice(0, 1).map((question) => {
                        let questions = question.attributes;
                        if(!questions.last_activity_info.answer_info){ // if no replies
                          return (
                            <div className="Single-Group-Question" key={ question.id }>
                              <SingleGroupQuestion
                                topic={ questions.group[0].title }
                                date={ Moment(questions.created_at).fromNow() }
                                body={ questions.text }
                                topicImage={ questions.picture_main }
                                editQuestion={ this.openDeleteQuestion }
                                author={ questions.author_info.name }
                                authorImage={ questions.author_info.avatar_thumb }
                                authorId={ questions.author_id }
                                questionID={ question.id }
                                id={ questions.group[0].id }
                              />
                              { this.state.deleteQuestion && (
                              <React.Fragment>
                                { this.state.questionToBeDeleted === question.id && (
                                  <React.Fragment>
                                  { questions.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                                    <div className="Single-Group-no-replies-image-dropdown">
                                      <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                      <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                    </div>
                                  ) : (
                                    <div className="Single-Group-no-replies-dropdown">
                                      <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                      <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                    </div>
                                  )}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                              )}
                              <br />
                              <div id="question-reply">
                                <div id="question-add-comment-body">
                                  <form className="add-question-reply" onSubmit={this.addReply}>
                                    { this.state.reply.name === questions.group[0].title ? (
                                    <input
                                      className="reply-input"
                                      value={ this.state.reply.data }
                                      placeholder="Share your thoughts..."
                                      type="text"
                                      id={ question.id }
                                      name={questions.group[0].title}
                                      onChange={ this.handleReplyInput } />
                                    ) : (
                                    <input
                                      className="reply-input"
                                      value={ this.state.otherReply }
                                      placeholder="Share your thoughts..."
                                      type="text"
                                      id={question.id}
                                      name={questions.group[0].title}
                                      onChange={ this.handleReplyInput } />
                                    ) }
                                  </form>
                                </div>
                              </div>
                            </div>
                          );
                        } else { // if there ARE replies, show them
                          return (
                            <div className="Single-Group-Question" key={ question.id }>
                              <SingleGroupQuestion
                                topic={ questions.group[0].title }
                                date={ Moment(questions.created_at).fromNow() }
                                body={ questions.text }
                                topicImage={ questions.picture_main }
                                editQuestion={ this.openDeleteQuestion }
                                author={ questions.author_info.name }
                                authorImage={ questions.author_info.avatar_thumb }
                                authorId={ questions.author_id }
                                questionID={ question.id }
                                id={ questions.group[0].id }
                                comments={ questions.latest_answerers_info }
                                reply={questions.last_activity_info.answer_info.text}
                                replyImage={questions.last_activity_info.author_info.avatar_thumb}
                                replyAuthor={questions.last_activity_info.author_info.name}
                                replyId={questions.last_activity_info.author_info.id}
                              />

                              { this.state.deleteQuestion && (
                                <React.Fragment>
                                { this.state.questionToBeDeleted === question.id && (
                                  <React.Fragment>
                                  { questions.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                                    <div className="Single-Group-image-dropdown">
                                      <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                      <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                    </div>
                                  ) : (
                                    <div className="Single-Group-dropdown">
                                      <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                      <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                    </div>
                                  )}
                                  </React.Fragment>
                                )}
                                </React.Fragment>
                              )}

                              <div id="question-reply">
                                <div id="question-add-comment-body">
                                  <form className="add-question-reply" onSubmit={this.addReply}>
                                    { this.state.reply.name === questions.group[0].title ? (
                                      <input
                                        className="reply-input"
                                        value={ this.state.reply.data }
                                        placeholder="Share your thoughts..."
                                        type="text"
                                        id={ question.id }
                                        name={questions.group[0].title}
                                        onChange={ this.handleReplyInput }
                                      />
                                      ) : (
                                        <input
                                          className="reply-input"
                                          value={ this.state.otherReply }
                                          placeholder="Share your thoughts..."
                                          type="text"
                                          id={question.id}
                                          name={questions.group[0].title}
                                          onChange={ this.handleReplyInput }
                                        />
                                      )
                                    }
                                  </form>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                      </div>
                      <hr />
                      <div className="single-Group-all-members" onClick={this.handleSelectors} id="discussionSelected">
                        See All Posts
                      </div>
                    </React.Fragment>
                    ) : (
                      <div className="single-Group-no-topics">
                        No Topics Yet... <br /><br />
                        <div className="single-Group-all-members" style={{border: 'none'}} onClick={this.handleSelectors} id="discussionSelected">
                        Feel free to be the first!
                        </div>
                      </div>
                    )}
                    <div className="Single-Group-photos-body">
                  </div>
                </React.Fragment>
                )}
                </div>
              </React.Fragment>
            ) : ( null )}



            { this.state.discussionSelected ? ( // SEE DISCUSSIONS
              <div className="Single-Group-topic-body">
                <div className="single-Group-New-Topic">
                  <div className="single-Group-New-Topic-Header">
                    <img src={StartDiscussion} alt="More" /> Start Discussion
                  </div>
                  <hr />
                  <div id="single-Group-NewTopic-input-body">
                    <form onSubmit={this.addNewTopic}>
                     <input
                        type="text"
                        placeholder="Start a new discussion in this group..."
                        className="single-Group-NewTopic-input"
                        value={ this.state.newTopic }
                        onChange={this.handleTopicInput} />
                      <button className="single-Group-NewTopic-btn">
                        Post
                      </button>
                      { this.state.files.length ? (
                        <React.Fragment>
                          <button
                            className="single-Group-Delete-btn"
                            type="button"
                            onClick={this.deletePhoto}>
                            X
                          </button>
                          <div className="single-Group-success-upload">
                            <div className="single-Group-post-thumb">
                               <div id="single-Group-thumbInner">
                                 <img
                                  src={this.state.files[0].preview}
                                  alt="upload"
                                 />
                               </div>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : null }
                    </form>
                  <Dropzone
                    className="group-dropzone"
                    accept="image/png, image/jpeg"
                    maxSize={ 3000000 }
                    onDrop={ this.onDrop }
                    onChange={ this.uploadFile }
                  >
                    {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                      if(acceptedFiles.length) {
                        if(this.state.files.length) {
                          return <button className="single-Group-replace-btn">
                            <img src={ Photo } alt="More" id="add-Photo"/>Replace
                          </button>
                        }
                      }
                      if (rejectedFiles.length) {
                          if (rejectedFiles[0].size > 3000000) { // Less than 3MB
                            return <div className="error-upload">
                              Please make sure the<br />
                              file size is smaller than 3MB </div>
                          }
                        return <div className="error-upload">
                          Please upload JPEG or PNG format</div>
                      } // Wrong file-type
                      if (isDragAccept) {
                        return <div className="success-drag"> + </div>
                      } // Show a PLUS sign in drag area if correct size & type
                      if (isDragReject) {
                        return <div className="error-upload">
                        Please upload JPEG or PNG format</div>
                      } // Show this if it's wrong format
                      else if (!this.state.files.length) {
                        return <button className="single-Group-Photo-btn">
                          <img src={ Photo } alt="More" id="add-Photo"/>Photo
                        </button>
                      }
                    }}
                  </Dropzone>

                  </div>
                </div>
                { this.props.groupQuestions.length ? (
                <React.Fragment>
                  <div className="single-Group-Recent-Posts">
                    Recent Posts
                    <hr />
                  </div>
                  { this.props.groupQuestions.map((question) => {
                    let questions = question.attributes;
                    if(!questions.last_activity_info.answer_info){ // if no replies
                      return (
                        <div className="Single-Group-Question" key={ question.id }>
                          <SingleGroupQuestion
                            topic={ questions.group[0].title }
                            date={ Moment(questions.created_at).fromNow() }
                            body={ questions.text }
                            topicImage={ questions.picture_main }
                            editQuestion={ this.openDeleteQuestion }
                            author={ questions.author_info.name }
                            authorImage={ questions.author_info.avatar_thumb }
                            authorId={ questions.author_id }
                            questionID={ question.id }
                            id={ questions.group[0].id }
                          />
                            { this.state.deleteQuestion && (
                              <React.Fragment>
                                { this.state.questionToBeDeleted === question.id && (
                                  <React.Fragment>
                                  { questions.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                                    <div className="Single-Group-no-replies-image-dropdown">
                                      <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                      <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                    </div>
                                  ) : (
                                    <div className="Single-Group-no-replies-dropdown">
                                      <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                      <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                    </div>
                                  )}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            )}
                          <br />
                          <div id="question-reply">
                            <div id="question-add-comment-body">
                              <form className="add-question-reply" onSubmit={this.addReply}>
                                { this.state.reply.name === questions.group[0].title ? (
                                <input
                                  className="reply-input"
                                  value={ this.state.reply.id === question.id ? this.state.reply.data : '' }
                                  placeholder="Share your thoughts..."
                                  type="text"
                                  id={ question.id }
                                  name={questions.group[0].title}
                                  onChange={ this.handleReplyInput } />
                                ) : (
                                <input
                                  className="reply-input"
                                  value={ this.state.reply.id === question.id ? this.state.reply.data : '' }
                                  placeholder="Share your thoughts..."
                                  type="text"
                                  id={ question.id }
                                  name={questions.group[0].title}
                                  onChange={ this.handleReplyInput } />
                                ) }
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    } else { // if there ARE replies, show them
                      return (
                        <div className="Single-Group-Question" key={ question.id }>
                          <SingleGroupQuestion
                            topic={ questions.group[0].title }
                            date={ Moment(questions.created_at).fromNow() }
                            body={ questions.text }
                            topicImage={ questions.picture_main }
                            editQuestion={ this.openDeleteQuestion }
                            author={ questions.author_info.name }
                            authorImage={ questions.author_info.avatar_thumb }
                            authorId={ questions.author_id }
                            questionID={ question.id }
                            comments= { questions.latest_answerers_info }
                            reply={questions.last_activity_info.answer_info.text}
                            replyImage={questions.last_activity_info.author_info.avatar_thumb}
                            replyAuthor={questions.last_activity_info.author_info.name}
                            replyId={questions.last_activity_info.author_info.id}
                            id={ questions.group[0].id }
                          />
                          { this.state.deleteQuestion && (
                            <React.Fragment>
                            { this.state.questionToBeDeleted === question.id && (
                              <React.Fragment>
                              { questions.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                                <div className="Single-Group-image-dropdown">
                                  <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                  <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                </div>
                              ) : (
                                <div className="Single-Group-dropdown">
                                  <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                  <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                </div>
                              )}
                              </React.Fragment>
                            )}
                            </React.Fragment>
                          )}
                          <div id="question-reply">
                            <div id="question-add-comment-body">
                              <form className="add-question-reply" onSubmit={this.addReply}>
                                { this.state.reply.name === questions.group[0].title ? (
                                  <input
                                    className="reply-input"
                                    value={ this.state.reply.id === question.id ? this.state.reply.data : '' }
                                    placeholder="Share your thoughts..."
                                    type="text"
                                    id={ question.id }
                                    name={questions.group[0].title}
                                    onChange={ this.handleReplyInput }
                                  />
                                  ) : (
                                    <input
                                      className="reply-input"
                                      value={ this.state.reply.id === question.id ? this.state.reply.data : '' }
                                      placeholder="Share your thoughts..."
                                      type="text"
                                      id={question.id}
                                      name={questions.group[0].title}
                                      onChange={ this.handleReplyInput }
                                    />
                                  )
                                }
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </React.Fragment>
                ) : (
                  <div className="single-Group-no-topics">
                    Go ahead, start the discussion.
                  </div>
                )}
              </div>
            ) : ( null )}


            { this.state.membersSelected ? ( // VIEW ALL MEMBERS
              <React.Fragment>
                <div className="single-Group-Members-Header">
                  Members &nbsp;&nbsp;{this.props.singleGroup.attributes.followers_count}
                </div>
                <div className="single-Group-Members-Admin-Container">
                  <div className="single-Group-Members-Admin-title">
                    Admin
                  </div>
                  <AdminMembers
                    data={this.props.admins}
                   />
                </div>
                <div className="single-Group-Members-Container">
                  <div className="single-Group-Members-Admin-title">
                    Members
                  </div>
                  <GroupMembers
                    data={this.props.members}
                    connect={this.followUser}
                    showGroupDropdown={this.showGroupLeaveDropdown}
                    dropdown={this.state.showGroupLeaveDropdown}
                    leaveGroup={ this.leaveGroup }
                   />
                </div>
              </React.Fragment>
            ) : null }

            { this.state.recommendationsSelected ? ( // VIEW RECOMMENDATIONS
              <React.Fragment>
                {this.props.recommendedGroups.length > 0 ? (

                <div className="single-Group-Recommendations-Container">
                  <GroupRecommendations
                    data={this.props.recommendedGroups}
                    handler={this.joinRecGroup}
                   />
                </div>

                ) : (
                <div className="single-Group-no-rec-groups">
                  No groups to recommend at this time!
                </div>
                )}
              </React.Fragment>
            ) : null }

            </div>
          </React.Fragment>
          )}
        </div>

      <Modal //// NEW GROUP
       show={this.state.openGroup}
       onClose={this.closeModal}
      >
       <NewGroup
        dataSent={this.closeModal}
       />
     </Modal>
         <Modal
             show={ this.state.openEdit }
             onClose={ this.closeModal }
             className="Modal-Backdrop"
           >

           <EditGroup
             groupData={ this.props.singleGroup }
             memberData={ this.props.members }
             onClose={ this.closeModal } />

         </Modal>

         <Modal
             show={ this.state.openRequests }
             onClose={ this.closeModal }
             className="Modal-Backdrop"
           >
           <React.Fragment>
              <button
                className="Edit-Group-close-btn"
                type="button"
                onClick={ this.closeModal } >
                X
              </button>
            { this.props.requests.map((request) => {
              return(
                <React.Fragment>
                  { request.attributes.group_info.id === this.state.group_ID ? (
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
                          <img src={Checkmark} className="Company-connected-icon" alt="Connect" id={ request.attributes.user_id } name={request.attributes.group_info.id} onClick={ this.acceptRequest } />
                          <img style={{marginLeft: "15px"}} src={Decline} className="Company-connected-icon" alt="Connect" id={ request.attributes.user_id } name={request.attributes.group_info.id} onClick={ this.declineRequest } />
                        </div>
                      </div>
                    </div>
                  ) : (
                  <div className="AllNotifications-empty">
                    That's it for Requests!
                  </div>
                  )}
                </React.Fragment>
              )
            })}
            <React.Fragment>
            { !this.props.requests.data && (
              <div className="AllNotifications-empty">
               No Requests
              </div>
            )}
            </React.Fragment>
          </React.Fragment>
         </Modal>

         <EditQuestionModal // EDIT TOPIC MODAL
               show={this.state.editTopic}
               onClose={this.closeModal}
              >
                <React.Fragment>
                  { this.props.singleQuestion <= 0 ? (
                    null
                  ) : (
                  <div className="single-Question-Edit">
                    <textarea
                      type="title"
                      id="title"
                      placeholder={this.props.singleQuestion.attributes.text}
                      defaultValue={this.props.singleQuestion.attributes.text}
                      onChange={this.editTopic}
                    />
                    <div className="single-Question-Edit-buttons">
                    <button
                       className="single-Group-edit-btn"
                       type="button"
                       onClick={this.closeModal}>
                       Cancel
                    </button>
                    <button
                       className="single-Group-edit-btn"
                       type="button"
                       onClick={this.handleQuestionEdit}>
                       Save Changes
                    </button>
                    </div>
                  </div>
                  )}
                </React.Fragment>
            </EditQuestionModal>

            <EditQuestionModal // DELETE TOPIC CHECK MODAL
               show={this.state.deleteCheck}
               onClose={this.closeModal}
              >
                <React.Fragment>
                  { this.props.singleQuestion <= 0 ? (
                    null
                  ) : (
                  <div className="Topic-Delete-Check">
                    <div id="single-Question-delete-headline">
                      Delete Topic
                    </div>
                    <div id="single-Question-delete-subline">
                      Are you sure you want to delete this topic? This cannot be undone.<br />
                      All responses to the topic will be deleted as well.
                    </div>
                    <div className="single-Question-delete-check-item">
                      <div id="single-Question-delete-check-post">
                        {this.props.singleQuestion.attributes.text}
                      </div>
                    </div>
                    <div className="single-Question-Edit-buttons">
                    <button
                       className="single-Group-edit-btn"
                       type="button"
                       onClick={this.closeModal}>
                       Cancel
                    </button>
                    <button
                       className="single-Group-delete-btn"
                       type="button"
                       onClick={this.handleDeleteQuestion}>
                       Delete
                    </button>
                    </div>
                  </div>
                  )}
                </React.Fragment>
              </EditQuestionModal>

      </div>
    );
  }
}

// sets store state on local props
const mapStateToProps = state => {
  return {
    singleGroup: state.singleGroupList,
    groupQuestions : state.singleGroupQuestionsList,
    admins : state.groupAdminsList,
    members : state.groupMembersList,
    recommendedGroups : state.recommendedGroupsList,
    user: state.userList,
    connections: state.connectionList,
    modal: state.modal,
    requests : state.groupRequestsList,
    singleQuestion: state.singleQuestionList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleGroup: (id) => {
      dispatch(loadSingleGroup(id));
    },
    loadQuestionsByGroup: (id) => {
      dispatch(loadQuestionsByGroup(id));
    },
    addSingleGroupReply: (reply, id, groupID) => {
      dispatch(addSingleGroupReply(reply, id, groupID));
    },
    loadGroupAdmins: (id) => {
      dispatch(loadGroupAdmins(id));
    },
    loadGroupMembers: (id) => {
      dispatch(loadGroupMembers(id));
    },
    getUser: (id) => {
      dispatch(getUser(id));
    },
    followGroup: (id) => {
      dispatch(followGroup(id));
    },
    addNewQuestion: (data, id, picture) => {
      dispatch(addNewQuestion(data, id, picture));
    },
    loadRecommendedGroups: () => {
      dispatch(loadRecommendedGroups());
    },
    getConnections: (id) => {
      dispatch(getConnections(id));
    },
    followRecommendedGroups: (id) => {
      dispatch(followRecommendedGroups(id));
    },
    requestGroupAccess: (id) => {
      dispatch(requestGroupAccess(id));
    },
    leaveGroup: (id) => {
      dispatch(leaveGroup(id));
    },
    followUser: (id) => {
      dispatch(followUser(id));
    },
    getGroupRequests: () => {
      dispatch(getGroupRequests());
    },
    getGroupInvites: () => {
      dispatch(getGroupInvites());
    },
    acceptPrivateGroupRequest: (groupID, userID) => {
      dispatch(acceptPrivateGroupRequest(groupID, userID));
    },
    getSingleQuestion: (id) => {
      dispatch(getSingleQuestion(id));
    },
    editQuestion: (data, groupID, questionID, where) => {
      dispatch(editQuestion(data, groupID, questionID, where));
    },
    deleteQuestion: (id, groupID, where) => {
      dispatch(deleteQuestion(id, groupID, where));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleGroup);












              // { this.props.singleGroup.is_followed_by_current ? (
              //   <React.Fragment>
              //     { this.props.groupQuestions.length <= 0 ? ( // if there's topics...
              //       <div className="single-Group-No">
              //         No topics yet, Join the Group to add your thoughts!
              //       </div>
              //       ) : ( null ) }
              //   </React.Fragment>
              // ) : ( // if you follow the group
              //   <React.Fragment>
              //     { this.props.groupQuestions.length <= 0 ? ( // if there's topics...
              //       <div className="single-Group-No">
              //         No topics yet, <NavLink to="/topic/new">share your thoughts!</NavLink>
              //       </div>
              //     ) : ( null ) }
              //   </React.Fragment>
              // )}


//           <Modal   // add comment group modal
//             show={this.state.openFollowers}
//             onClose={this.closeModal}
//             className="Modal-Backdrop"
//           >
//             <div className="GroupMembers-Container">
//             { this.props.members.length <= 0 ? (
//               <div id="loading">
//                 <p className="loading">Loading Members<span>.</span><span>.</span><span>.</span></p>
//               </div>
//             ) : (
//               <GroupMembers
//                 data={this.props.members}
//               />
//             )}
//             </div>
//           </Modal>




