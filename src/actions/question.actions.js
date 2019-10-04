import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";
const addNewQuestionToGroupURL = `${url}questions`;
const addQuestionReplyURL = `${url}answers`;
const getQuestionsURL = `${url}questions?filter_by_user_groups=true`;
const getQuestionsByGroupURL = `${url}questions?group_id=`;
const getAnswersURL = `${url}questions/`;
const deleteQuestionURL = `${url}questions`;

export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
export const LOAD_QUESTIONS_BY_GROUP = 'LOAD_QUESTIONS_BY_GROUP';
export const GET_GROUP_QUESTIONS_AFTER_REPLY = 'GET_GROUP_QUESTIONS_AFTER_REPLY';
export const ADD_QUESTION_REPLY = 'ADD_QUESTION_REPLY';
export const GET_QUESTIONS_AFTER_REPLY = 'GET_QUESTIONS_AFTER_REPLY';
export const GET_ANSWERS = 'GET_ANSWERS';
export const GET_SINGLE_QUESTION_AFTER_REPLY = 'GET_SINGLE_QUESTION_AFTER_REPLY';
export const GET_SINGLE_QUESTION = 'GET_SINGLE_QUESTION';
export const GET_SINGLE_GROUP_AFTER_REPLY = 'GET_SINGLE_GROUP_AFTER_REPLY';
export const EMPTY_LIST = 'EMPTY_LIST';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ERROR = 'ERROR';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});


export const addQuestionReply = (reply, id, picture) => {
  return(dispatch) => {
    return Axios({
      method: 'post',
      url: addQuestionReplyURL,
      headers: headers(),
      data: {
        "answer": {
          "question_id": parseInt(id),
          "text": reply,
          "picture": ''
        }
      }
    })
    .then(response => {
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: getQuestionsURL,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: GET_QUESTIONS_AFTER_REPLY,
            questions: response.data.data
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const addSingleGroupReply = (reply, id, groupID) => {
  return(dispatch) => {
    return Axios({
      method: 'post',
      url: addQuestionReplyURL,
      headers: headers(),
      data: {
        "answer": {
          "question_id": parseInt(id),
          "text": reply,
          "picture": ''
        }
      }
    })
    .then(response => {
      console.log(groupID);
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: getQuestionsByGroupURL + groupID,
          headers: headers()
        })
        .then(response => {
          console.log(response.data.data);
          dispatch({
            type: GET_SINGLE_GROUP_AFTER_REPLY,
            questions: response.data.data
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const addSingleQuestionReply = (reply, id, picture) => {
  return(dispatch) => {
    return Axios({
      method: 'post',
      url: addQuestionReplyURL,
      headers: headers(),
      data: {
        "answer": {
          "question_id": parseInt(id),
          "text": reply,
          "picture": picture
        }
      }
    })
    .then(response => {
      console.log(response.data.data);
      if(response.status === 201) {
        dispatch({
          type: GET_SINGLE_QUESTION_AFTER_REPLY,
          answers: response.data.data
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const addNewQuestion = (reply, id, picture) => {
  let arrID = [];
  arrID.push(JSON.parse(id));
  return(dispatch) => {
    return Axios({
      method: 'post',
      url: addNewQuestionToGroupURL,
      headers: headers(),
      data: {
        "question": {
          "text": reply,
          "group_of_interest_ids": arrID,
          "question_type": "topic",
          "picture": picture
        }
      }
    })
    .then(response => {
      if(response.status === 201){
        return Axios({
          method: 'get',
          url: getQuestionsByGroupURL + id,
          headers: headers()
        })
        .then(response => {
          console.log(response);
          dispatch({
            type: LOAD_QUESTIONS_BY_GROUP,
            questions: response.data.data
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};



export const getAnswers = (id) => {
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getAnswersURL + id + `/answers`,
      headers: headers()
    })
    .then(response => {
      if(response.data.data.length === 0) {
        dispatch({
          type: EMPTY_LIST,
          answers: response.data.data
        });
      }
      dispatch({
        type: GET_ANSWERS,
        answers: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getSingleQuestion = (id) => {
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getAnswersURL + id,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_SINGLE_QUESTION,
        question: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


export const editQuestion = (reply, questionID, groupID, where) => {
  console.log(where);
  return(dispatch) => {
    return Axios({
      method: 'put',
      url: deleteQuestionURL + `/` + questionID,
      headers: headers(),
      data: reply,
    })
    .then(response => {
      if(response.status === 204 && where === "feed") {
        return Axios({
          method: 'get',
          url: getQuestionsURL,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: GET_QUESTIONS,
            questions: response.data.data
          });
        });
      }
      if(response.status === 204 && where === "singleGroup") {
        return Axios({
          method: 'get',
          url: getQuestionsByGroupURL + groupID,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: LOAD_QUESTIONS_BY_GROUP,
            questions: response.data.data
          });
        });
      }
      if(response.status === 204 && where === "singleQuestion") {
        return Axios({
          method: 'get',
          url: getAnswersURL + questionID,
          headers: headers()
        })
        .then(response => {
          console.log(response);
          dispatch({
            type: GET_SINGLE_QUESTION,
            question: response.data.data
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const deleteQuestion = (questionID, groupID, where) => {
  return(dispatch) => {
    return Axios({
      method: 'delete',
      url: deleteQuestionURL + `/` + questionID,
      headers: headers()
    })
    .then(response => {
      if(response.status === 204) {
        if (where === "singleGroup") {
          history.push(`/groups/${groupID}`);
          return Axios({
            method: 'get',
            url: getQuestionsByGroupURL + groupID,
            headers: headers()
          })
          .then(response => {
            toast.success(`Topic Deleted`, {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
            });
            dispatch({
              type: LOAD_QUESTIONS_BY_GROUP,
              questions: response.data.data
            });
          });

        }
        if(where === "feed") {
          history.push(`/feed`);
          return Axios({
            method: 'get',
            url: getQuestionsURL,
            headers: headers()
          })
          .then(response => {
            toast.success(`Topic Deleted`, {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
            });
            dispatch({
              type: GET_QUESTIONS,
              questions: response.data.data
            });
          });
        }
        if(where === "singleQuestion") {
          history.push(`/feed`);
          return Axios({
            method: 'get',
            url: getQuestionsURL,
            headers: headers()
          })
          .then(response => {
            toast.success(`Topic Deleted`, {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
            });
            dispatch({
              type: GET_QUESTIONS,
              questions: response.data.data
            });
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};