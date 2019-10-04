import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { NavLink } from 'react-router-dom';
import Moment from 'moment';
import { addSingleQuestionReply, getAnswers, getSingleQuestion, deleteQuestion, editQuestion } from '../../../actions/question.actions';
import Header from '../../../components/Header.js';
import Modal from '../../Modal';
import EditQuestionModal from '../../EditQuestionModal';
import IndividualQuestion from '../../../components/singleQuestion.components.js';
import SingleQuestionTopic from '../../../components/singleQuestion.topic.components.js';
import Photo from '../../../assets/icons/image.png';

import Checkmark from '../../../assets/Checkmark.png';
import Decline from '../../../assets/Decline.png';
import Linkify from 'linkifyjs/react';
  // {{url}}/question/:id/

class SingleQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      question_ID: this.props.match.params.id,
      isOpen: false,
      reply: {
        id: '',
        data: '',
      },
      openDropdown: false,
      deleteQuestion: false,
      questionToBeDeleted: '',
      editTopic: false,
      topic: '',
      deleteCheck: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleReplyInput = this.handleReplyInput.bind(this);
    this.addReply = this.addReply.bind(this);
    this.openDeleteQuestion = this.openDeleteQuestion.bind(this);
    this.deleteCheck = this.deleteCheck.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.editTopic = this.editTopic.bind(this);
    this.handleQuestionEdit = this.handleQuestionEdit.bind(this);
  }

  openModal (evt) {
    this.props.getDocuments();
    this.setState({
      isOpen: true,
    });
  }

  closeModal (evt) {
    this.setState({
      isOpen: false,
      editTopic: false,
      deleteCheck: false,
    });
  }
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getAnswers(this.state.question_ID);
    this.props.getSingleQuestion(this.state.question_ID);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
  openEdit (evt) {
    evt.preventDefault();
    this.setState({
      openEdit: true,
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

  addReply(evt) {
    evt.preventDefault();
    this.props.addSingleQuestionReply(this.state.reply.data, this.state.reply.id);
    this.setState({
      firstReply: '',
      otherReply: '',
      reply: {
        id: '',
        data: '',
      },
    });
  }
  openDeleteQuestion(evt) {
    evt.preventDefault();
    this.setState({
      deleteQuestion: true,
      questionToBeDeleted: evt.target.id
    }, () => {
      document.addEventListener('click', this.closeDropdown);
    });
  }
  closeDropdown() {
    this.setState({
      deleteQuestion: false,
      topic: '',
    }, () => {
      document.removeEventListener('click', this.closeDropdown);
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
    let groupID = parseInt(this.props.question.attributes.group[0].id);
    let questionID = parseInt(this.state.question_ID);
    this.props.deleteQuestion(questionID, groupID, 'singleQuestion');
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
  handleQuestionEdit(evt) {
    evt.preventDefault();
    let questionData = { "question": { "question_type": "topic" } };
    let groupArrayID = [];
    let groupID = parseInt(this.props.question.attributes.group[0].id);
    let questionID = parseInt(this.state.questionToBeDeleted);
    groupArrayID.push(JSON.parse(groupID));

    if(this.state.topic) {
      Object.assign(questionData.question, {text: this.state.topic});
    }
    if(this.state.description) {
      Object.assign(questionData.question, {description: this.state.description});
    }
    Object.assign(questionData.question, {group_of_interest_ids: groupArrayID});
    this.props.editQuestion(questionData, questionID, groupID, "singleQuestion");
    this.setState({
      editTopic: false,
    });
  }

  render() {
    return(
      <div className="feed">
        <Header />
        <ToastContainer autoClose={3000} />
        <div className="user-view">
          { this.props.question.length <= 0 ? (
            <div id="loading">
              <p className="loading">Fetching that question<span>.</span><span>.</span><span>.</span></p>
            </div>
          ) : ( // once it's done loading....

          <div className="Single-Question-body">
            <div className="single-question-grid">
              <div className="topicdate">
                <NavLink to={`/groups/${this.props.question.attributes.group[0].id}/`}>
                  { this.props.question.attributes.group[0].title } &nbsp;<b>&sdot;</b>&nbsp; { Moment(this.props.question.attributes.created_at).fromNow() }
                </NavLink>
              </div>
              <div id="question-item">
                <div id="question-photo">
                  <img src={ this.props.question.attributes.author_info.avatar_medium } alt="profile" />
                </div>
                <div id="question-body">
                  <Linkify>
                    { this.props.question.attributes.text }
                  </Linkify>
                </div>
                { this.props.question.attributes.author_id === parseInt(localStorage.id) && (
                  <button
                    className="Question-Delete-btn"
                    type="button"
                    id={this.props.question.id}
                    onClick={this.openDeleteQuestion}
                    >
                    &middot;&middot;&middot;
                  </button>
                )}
                { this.state.deleteQuestion && (
                  <React.Fragment>
                  { this.state.questionToBeDeleted === this.props.question.id && (
                    <React.Fragment>
                    { this.props.question.attributes.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                      <div className="SingleQuestion-image-dropdown">
                        <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                        <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                      </div>
                    ) : (
                      <div className="SingleQuestion-dropdown">
                        <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                        <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                      </div>
                    )}
                    </React.Fragment>
                  )}
                  </React.Fragment>
                )}

                { this.props.question.attributes.picture_main && (
                  <React.Fragment>
                    { this.props.question.attributes.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                      <div id="single-question-image">
                        <img className="question-content-image" src={ this.props.question.attributes.picture_main } alt="profile"/>
                      </div>
                    ) : null }
                  </React.Fragment>
                )}
                <div id="question-author">
                  posted by&nbsp;
                    <a href={`/users/${this.props.question.attributes.author_id}`}>{ this.props.question.attributes.author_info.name }</a>
                </div>
              </div>
            </div>
            { this.props.answers.map((answer) => {
              return (
                <div className="Answers" key={ answer.id }>
                  <IndividualQuestion
                    answers={ answer.attributes }
                  />
                </div>
              );
            })}

            <div id="single-question-add-comment-body">
              <hr />
               <form className="single-add-question-reply" onSubmit={this.addReply}>
                 <input
                   className="reply-input"
                   value={ this.state.reply.data }
                   placeholder="Add Reply..."
                   type="text"
                   id={ this.props.match.params.id }
                   onChange={ this.handleReplyInput } />
               </form>

               <div id="single-question-reply-photo">
                   <img src={ localStorage.image } alt="profile" />
               </div>
           </div>
          </div>
          )}
        </div>
        <EditQuestionModal // EDIT TOPIC MODAL
         show={this.state.editTopic}
         onClose={this.closeModal}
        >
          <React.Fragment>
            { this.props.question <= 0 ? (
              null
            ) : (
            <div className="single-Question-Edit">
              <textarea
                type="title"
                id="title"
                placeholder={this.props.question.attributes.text}
                defaultValue={this.props.question.attributes.text}
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
              { this.props.question <= 0 ? (
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
                    {this.props.question.attributes.text}
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
    answers: state.answersList,
    modal: state.modal,
    question: state.singleQuestionList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAnswers: (id) => {
      dispatch(getAnswers(id));
    },
    addSingleQuestionReply: (reply, id) => {
      dispatch(addSingleQuestionReply(reply, id));
    },
    getSingleQuestion: (id) => {
      dispatch(getSingleQuestion(id));
    },
    deleteQuestion: (id, groupID, where) => {
      dispatch(deleteQuestion(id, groupID, where));
    },
    editQuestion: (data, questionID, groupID, where) => {
      dispatch(editQuestion(data, questionID, groupID, where));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleQuestion);




