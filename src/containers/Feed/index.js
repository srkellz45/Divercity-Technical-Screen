import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRecommendedJobs, loadSingleJob, saveJob } from '../../actions/job.actions';
import { followRecommendedConnections } from '../../actions/connection.actions';
import { loadFollowingGroups, loadQuestions, loadRecommendedGroups, followRecommendedGroups, } from '../../actions/group.actions';
import { getUser, getRecommendedUsers, searchUserMention } from '../../actions/user.actions';
import { addQuestionReply, getSingleQuestion, editQuestion, deleteQuestion } from '../../actions/question.actions';
import Header from '../../components/Header';
import Moment from 'moment';
import JobModal from '../Job/JobApplyModal';
import ApplyJob from '../Job/ApplyJob';
import NewJob from '../Job/NewJob';
import Modal from '../Modal';
import EditQuestionModal from '../EditQuestionModal';

import RecommendedGroups from '../../components/feed.RecommendedGroups.components.js';
import RecommendedUsers from '../../components/feed.RecommendedUsers.components.js';
import TrendingJobs from '../../components/feed.TrendingJobs.components.js';
import Question from '../../components/feed.Question.components.js';
import JobApply from '../../components/job.apply.components';
import { ToastContainer, Flip } from "react-toastify";
import { Select } from 'glamorous';

class Feed extends Component {
	constructor(props){
		super(props);

		this.state = {
			isOpen: false,
			loading: false,
			applyOpen: false,
			newJobModal: false,
			page: 1,
			reply: {
				id: '',
				data: ''
			},
			otherReply: '',
			firstReply: '',
			questionID: '',
			jobs: [],
			groups: [],
			deleteQuestion: false,
			questionToBeDeleted: '',
			showBanner: true,
			editTopic: false,
			topic: '',
			deleteCheck: false,
			userSuggestion: [],
			nameMention: '',
			ID: parseInt(localStorage.getItem('id'))
		};
	}

	openModal = evt => this.setState({
		isOpen: true,
	});

	closeModal = () => this.setState({
		isOpen: false,
		newJobModal: false,
		deleteQuestion: false,
		editTopic: false,
		topic: '',
		deleteCheck: false
	});

	closeApplyModal = () => this.setState({
		applyOpen: false
	});

	openNewJob = () => this.setState({
		newJobModal: true
	});

	componentDidMount() {
		window.scrollTo(0,0);
		localStorage.removeItem('type');
		localStorage.removeItem('error');
		this.props.loadQuestions();
		this.props.getUser(localStorage.id);
		this.props.loadRecommendedJobs();
		this.props.loadRecommendedGroups();
		this.props.loadFollowingGroups();
		this.props.getRecommendedUsers();
		localStorage.setItem("pageLimit", 10);
	}

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.recommendedJobs !== prevProps.recommendedJobs) {
      this.setState({
        jobs: (this.props.recommendedJobs)
      });
    }

    if (this.props.recommendedGroups !== prevProps.recommendedGroups) {
      this.setState({
        groups: (this.props.recommendedGroups)
      });
    }

    if (this.props.userSuggest !== prevProps.userSuggest) {
      let suggestResult = this.props.userSuggest;
      var suggestNames = suggestResult.map(res => res.attributes.name);

      console.log(suggestNames);

      this.setState({
        userSuggestion: suggestNames
      });
    }
  }

	componentWillUmount() {
		document.removeEventListener('click', this.closeDropdown);
	}

  joinGroup = evt => {
    evt.preventDefault();
    this.props.followRecommendedGroups(evt.target.id);
  };

  removeRecommendedItem = evt => {
    evt.preventDefault();

    if(evt.target.name === "Job") {
      let jobsToFilter = this.state.jobs;

      this.setState({
        jobs: jobsToFilter.filter( el =>  el.id !== (evt.target.id))
      });
    }

    if(evt.target.name === "Group") {
      let groupsToFilter = this.state.groups;

      this.setState({
        groups: groupsToFilter.filter( el =>  el.id !== (evt.target.id))
      });
    }
  };

  handleChange = evt => {
    evt.preventDefault();

    const target = evt.target;
    this.props.loadSingleJob(target.id);
    this.setState({
      jobId : target.id,
      isOpen: true,
      singleJob: this.props.singleJob
    });
  };

	handleJobApply = evt => this.setState({
		applyOpen: true,
		isOpen: false
	});

	handleJobSave = evt => this.setState({
		isOpen: false,
		applyOpen: false,
	}, () => this.props.saveJob(this.state.jobId));

	handleQuickSave = (evt) => this.props.saveJob(evt.target.id);

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    });

    this.props.loadMoreJobs(this.state.page);
  };

  addReply = evt => {
    evt.preventDefault();

    var {ID} = this.state;

    if(this.state.firstReply.length) {
      let ans = this.state.firstReply.split("@");
      if (ans[1] != undefined) {
        ans[1] = '<@U-'+ ID +'>';
      }
      ans = ans.join('');
      this.props.addQuestionReply(ans, this.state.questionID);
    } else {
      let ans = this.state.reply.data.split("@");
      if (ans[1] != undefined) {
        ans[1] = '<@U-'+ ID +'>';
      }
      ans = ans.join('');
      this.props.addQuestionReply(ans, this.state.reply.id);
    }

    this.setState({
      firstReply: '',
      otherReply: '',
      reply: {
        id: '',
        data: '',
      },
    });
  };

  handleReplyInput = evt => {
    evt.preventDefault();

    this.setState({
      reply: {
        data: evt.target.value,
        name: evt.target.name,
        id: evt.target.id
      },
    });
    let comment = evt.target.value.split("@");
    let name = comment[1];
    if (name != undefined) {
      //search for user name suggestions
      this.props.searchUserMention(name);
    }
  };

  handleFirstReplyInput = evt => {
    evt.preventDefault();

    this.setState({
      firstReply: (evt.target.value),
      questionID: (evt.target.id)
    });
  };

  connectWithUser = evt  => {
    evt.preventDefault();

    this.props.followRecommendedConnections(evt.target.id);
  };

  openDeleteQuestion = evt => {
    evt.preventDefault();

    this.props.getSingleQuestion(evt.target.id);

    this.setState({
      deleteQuestion: true,
      questionToBeDeleted: evt.target.id
    }, () => document.addEventListener('click', this.closeDropdown));
  };

	closeDropdown = () =>this.setState({
		deleteQuestion: false,
		topic: ''
	}, () => document.removeEventListener('click', this.closeDropdown));

  deleteCheck = evt => {
    evt.preventDefault();

    this.setState({
      deleteCheck: true,
    });
  };

  handleDeleteQuestion = evt => {
    evt.preventDefault();

    let groupID = parseInt(this.props.singleQuestion.attributes.group[0].id);
    let questionID = parseInt(this.state.questionToBeDeleted);
    this.props.deleteQuestion(questionID, groupID, 'feed');
    this.setState({
      deleteCheck: false,
    });
  };

  editQuestion = evt => {
    evt.preventDefault();

    this.setState({
      editTopic: true,
    });
  };

	editTopic = evt => this.setState({
		topic: evt.target.value
	});

  closeBanner = evt => {
    evt.preventDefault();

    localStorage.setItem('hasPostedJob', true);
    this.setState({
      showBanner: false
    });
  };

  handleQuestionEdit = evt => {
    evt.preventDefault();

    let questionData = { "question": { "question_type": "topic" } };
    let groupArrayID = [];
    let groupID = parseInt(this.props.singleQuestion.attributes.group[0].id);
    let questionID = parseInt(this.state.questionToBeDeleted);
    groupArrayID.push(JSON.parse(groupID));

    if(this.state.topic) Object.assign(questionData.question, {text: this.state.topic});

    if(this.state.description) Object.assign(questionData.question, {description: this.state.description});

    Object.assign(questionData.question, {group_of_interest_ids: groupArrayID});
    this.props.editQuestion(questionData, questionID, groupID, "feed");
    this.setState({
      editTopic: false,
    });
  };
  // onClickName = (evt) => {
  //   evt.preventDefault();
  //   let selectName = evt.target.getAttribute('value');
  //   if(this.state.firstReply.length) {
  //     let reply = this.state.firstReply.split("@");
  //     reply[1] = '@'+selectName;
  //     reply = reply.join('');
  //     this.setState({
  //       firstReply: reply,
  //       userSuggestion: []
  //     });
  //   } else {
  //     let reply = this.state.reply.data.split("@");
  //     reply[1] = '@'+selectName;
  //     reply = reply.join('');
  //     this.setState({
  //       reply: {
  //         id: this.state.reply.id,
  //         data: reply
  //       },
  //       userSuggestion: []
  //     });
  //   }
  // };

  render() {
    let { user } = this.props;
    //console.log(user);

    return (
      <div className="feed">
        <Header />

        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} />
        { this.props.questions.length <= 0 ? (
            <div id="loading">
              <p className="loading">Getting Feed<span>.</span><span>.</span><span>.</span></p>
            </div>
          ) : (
          <React.Fragment>
            <div className="Feed-box">
              <div className="Trending-Jobs-Left">
                <div className="Trending-header">Trending Jobs</div>

                <div className="Trending-container">
                  { this.state.jobs.map((job) => {
                    let jobs = job.attributes;
                      return (
                        <div className="Trending" key={ job.id }>
                          <TrendingJobs
                            image={ jobs.images.thumb }
                            title={ jobs.title }
                            employer={ jobs.employer }
                            location={ jobs.location_display_name }
                            id={ job.id }
                            handler={this.handleChange}
                            applied={jobs.is_applied_by_current}
                            close={this.removeRecommendedItem}
                          />
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className="Feed-Center">
                { this.props.recommendedUsers.length > 0 ?
                  <div className="Recommended-User-Body">
                    <div className="Recommended-header" >
                      Recommended Connections
                    </div>
                    { this.props.recommendedUsers.filter(user => this.props.deselectedRecommendedUsers.indexOf(user.id) < 0 ? true : false).slice(0, 3).map((user) => {
                      let users = user.attributes;
                        return (
                          <div className="Recommended-User" key={ user.id }>
                            <RecommendedUsers
                              image={ users.avatar_medium }
                              name={ users.name }
                              type={ users.account_type}
                              title={ users.occupation }
                              company={ users.company }
                              id={ user.id }
                              connect={ this.connectWithUser }
                              connected={ users.is_followed_by_current }
                            />
                          </div>
                        );
                      })
                    }
                  </div>
                : "" }
                { !localStorage.hasPostedJob && localStorage.role === 'recruiter' ? (
                <React.Fragment>
                  { this.state.showBanner && (
                  <div className="Recruiter-post-body">
                    <button
                      className="Recruiter-post-remove-btn"
                      type="button"
                      onClick={this.closeBanner}>
                      X
                    </button>
                  <div className="Recruiter-post-headline">
                    Post a Job now to start sourcing ideal Candidates!
                  </div>
                    <div className="Recruiter-post-btn">
                    <button
                       className="Create-Job-btn"
                       type="submit"
                       onClick={this.openNewJob}
                       aria-label="Post New Job">
                       Create a Job Posting
                     </button>
                     </div>
                  </div>
                  )}
                </React.Fragment>
                ) : null }

                <div className="Question-body">
                  <div id="Questions-Feed-No-Questions">
                  </div>
                { this.props.questions.length > 0 ? (
                  <React.Fragment>
                  { this.props.questions.map((question) => {
                    let questions = question.attributes;
                    if(!questions.last_activity_info.answer_info){ // if no replies
                      return (
                        <div className="Question" key={ question.id }>
                          <Question
                            id={ questions.group[0].id }
                            topic={ questions.group[0].title }
                            date={ Moment(questions.created_at).fromNow() }
                            body={ questions.text }
                            topicImage={ questions.picture_main }
                            editQuestion={ this.openDeleteQuestion }
                            author={ questions.author_info.name }
                            authorImage={ questions.author_info.avatar_thumb }
                            authorId={ questions.author_id }
                            questionID={ question.id }
                          />

                            { this.state.deleteQuestion && (
                              <React.Fragment>
                              { this.state.questionToBeDeleted === question.id && (
                                <React.Fragment>
                                { questions.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                                  <div className="Question-no-replies-image-dropdown">
                                    <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                    <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                  </div>
                                ) : (
                                  <div className="Question-no-replies-dropdown">
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
                                { this.state.reply.id === question.id ? (
                                <input
                                  className="reply-input"
                                  value={ this.state.reply.data }
                                  placeholder="Share your thoughts..."
                                  type="text"
                                  id={ question.id }
                                  name={ questions.group[0].title }
                                  onChange={ this.handleReplyInput } />
                                ) : (
                                <input
                                  className="reply-input"
                                  value={ this.state.otherReply }
                                  placeholder="Share your thoughts..."
                                  type="text"
                                  id={ question.id }
                                  name={ questions.group[0].title }
                                  onChange={ this.handleReplyInput } />
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                        );
                       } else {
                        return ( // if I have replies
                          <div className="Question" key={ question.id }>
                            <Question
                              id={ questions.group[0].id }
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
                            />

                            { this.state.deleteQuestion && (
                              <React.Fragment>
                              { this.state.questionToBeDeleted === question.id && (
                                <React.Fragment>
                                { questions.picture_main !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                                  <div className="Question-image-dropdown">
                                    <div id="Question-dropdown-item" onClick={this.editQuestion}>Edit Topic</div>
                                    <div id="Question-dropdown-item" onClick={this.deleteCheck}>Delete Topic</div>
                                  </div>
                                ) : (
                                  <div className="Question-dropdown">
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
                                  { this.state.reply.id === question.id ? (
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
                                    id={ question.id }
                                    name={questions.group[0].title}
                                    onChange={ this.handleReplyInput } />
                                  )}
                                </form>
                                {/* {this.state.userSuggestion && this.state.userSuggestion.length > 0 ? (
                                  <div className="user_mention_dropdown">
                                      {this.state.userSuggestion.map(name => {
                                        return (
                                          <span className="dropdown-name" >
                                            <div value={name}>{name}</div>
                                          </span>
                                        );
                                    })}
                                </div>) : null } */}
                              </div>
                            </div>
                          </div>
                          );
                        }
                    })}
                  </React.Fragment>
                  ) : (
                  <div id="Questions-Feed-No-Questions" style={{padding: '1.75rem'}}>
                      Looks a little empty in here...<br /><br />
                      <NavLink to="/people/groups"> Try following more groups! </NavLink>
                  </div>
                  )}
                </div>
              </div>
              <div className="Trending-Groups-Right">
                <div className="Recommended-Group-header">
                  Recommended Groups
                </div>
                <div className="Recommended-Group-body" >
                { this.state.groups.map((group) => {
                  let groups = group.attributes;
                    return (
                      <div className="Recommended-Group" key={ group.id }>
                        <RecommendedGroups
                          image={ groups.picture_main }
                          title={ groups.title }
                          followers={ groups.followers_count }
                          id={ group.id }
                          handler={this.joinGroup}
                          close={this.removeRecommendedItem}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
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
              <Modal // NEW JOB MODAL
               show={this.state.newJobModal}
               onClose={this.closeModal}
              >
                <NewJob />
              </Modal>

              <EditQuestionModal // EDIT TOPIC MODAL
               show={this.state.editTopic}
               onClose={this.closeModal}
              >
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
              </EditQuestionModal>

              <EditQuestionModal // DELETE TOPIC CHECK MODAL
               show={this.state.deleteCheck}
               onClose={this.closeModal}
              >
                  { this.props.singleQuestion <= 0 ? null
                  : (
                  <div className="Topic-Delete-Check">
                    <div id="single-Question-delete-headline">Delete Topic</div>

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
              </EditQuestionModal>
            </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
	recommendedGroups : state.recommendedGroupsList,
	recommendedUsers : state.recommendedUsersList,
	recommendedJobs : state.recommendedJobsList, // makes it this.props.jobs
	singleJob : state.singleJobList,
	user : state.userList,
	groups : state.groupsList,
	questions : state.questionsList,
	singleQuestion: state.singleQuestionList,
	userSuggest : state.searchUserList,
	deselectedRecommendedUsers: state.deselectedRecommendedUsersList
})

export default connect(mapStateToProps, {loadRecommendedJobs, loadRecommendedGroups, getRecommendedUsers, loadSingleJob, loadFollowingGroups, followRecommendedGroups, getUser, loadQuestions, saveJob, addQuestionReply, followRecommendedConnections, getSingleQuestion, editQuestion, deleteQuestion, searchUserMention})(Feed);