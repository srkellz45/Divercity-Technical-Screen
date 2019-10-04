import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";
let chatURL = `${url}users/`;
let sendMessageURL = `${url}messages`;
let initChatURL = `${url}users/`;
let allChatsURL = `${url}users/`;

export const ERROR = 'ERROR';
export const CREATE_CHAT_ID = 'CREATE_CHAT_ID';
export const LOAD_CHAT = 'LOAD_CHAT';
export const ALL_CHATS = 'ALL_CHATS';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const getAllChats = (myID) => dispatch => {
	Axios.get(allChatsURL + myID + `/chats`, {
  		headers: headers()
	})
    .then(chat => dispatch({
		type: ALL_CHATS,
		chats: chat.data.data
	}))
    .catch(err => {
		toast.error(`Something went wrong`, {
			position: toast.POSITION.TOP_CENTER,
			hideProgressBar: true,
			pauseOnHover: true,
		});

		console.log(err);

		dispatch({
			type: ERROR,
			error: err
		});
    });
};

export const loadChat = (myID, chatID, otherID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: chatURL + myID + `/chats/` + chatID + `?other_user=` + otherID,
      headers: headers()
    })
    .then(chat => {
      dispatch({
        type: LOAD_CHAT,
        chat: chat.data.data
      });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const createChatID = (myID, otherUser) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: initChatURL + `${myID}/chats?other_user=${otherUser}`,
      headers: headers(),
    })
    .then((response) => {
      dispatch({
        type: CREATE_CHAT_ID,
        chatID: response.data.data
      });
      return Axios({
        method: 'get',
        url: chatURL + myID + `/chats/` + response.data.data.id + `?other_user=` + otherUser,
        headers: headers()
      });
    })
    .then(chat => {
      dispatch({
        type: LOAD_CHAT,
        chat: chat.data.data
      });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const sendNewMessage = (message, chatID) => {
  return (dispatch) => {
    return Axios({
        method: 'post',
        url: sendMessageURL,
        headers: headers(),
        data: {
          message : {
            content: message,
            chat_id: chatID
          }
        }
    })
    .then(data => {
      // dispatch({
      //   type: LOAD_JOBS,
      //   jobs: jobs.data.data
      // });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const sendFirstMessage = (message, chatID) => {
  return (dispatch) => {
    return Axios({
        method: 'post',
        url: sendMessageURL,
        headers: headers(),
        data: {
          message : {
            content: message,
            chat_id: chatID
          }
        }
    })
    .then(data => {
      history.push(`/messages`);
      // dispatch({
      //   type: LOAD_JOBS,
      //   jobs: jobs.data.data
      // });
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};