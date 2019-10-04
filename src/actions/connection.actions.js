import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";

export const GET_CONNECTIONS = 'GET_CONNECTIONS';
export const GET_OTHER_USER_CONNECTIONS = 'GET_OTHER_USER_CONNECTIONS';
export const VIEW_FOLLOWED_USER = 'VIEW_FOLLOWED_USER';
export const GET_RECOMMENDED_USERS = 'GET_RECOMMENDED_USERS';
export const FOLLOW_REC_USER = 'FOLLOW_REC_USER';
export const FOLLOW_PEOPLE = 'FOLLOW_PEOPLE';
export const GET_PEOPLE = 'GET_PEOPLE';
export const ACCEPT_CONNECTION = 'ACCEPT_CONNECTION';
export const GET_CONNECTIONS_REQUESTS = 'GET_CONNECTIONS_REQUESTS';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const FOLLOW_USER = 'FOLLOW_USER';
export const GET_MORE_USERS = 'GET_MORE_USERS';
export const ERROR = 'ERROR';

const connectUserURL = `${url}users/connect`;
const disconnectUserURL = `${url}users/remove_connection`;
const getUserURL = `${url}users/`;
const getAllUsersURL = `${url}users?page[number]=`;
const getMyConnectionRequestsURL = `${url}users/`;
const acceptConnectionURL = `${url}/users/accept_connection`;
const myFollowersURL = `${url}/users/`;
const getRecommendedConnectionsURL = `${url}recommenders/users?page[number]=`;

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const connectUser = (ID, method) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: connectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: getUserURL + ID,
          headers: headers()
        })
        .then(response => {
            dispatch({
              type: VIEW_FOLLOWED_USER,
              user: response.data.data
           });
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const unconnectUser = (ID, userID, where) => {
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: disconnectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      console.log(response);
      console.log(where);
      console.log(userID);
      if(response.status === 200) {
        toast.success(`Unconnected`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
        switch(where) {
          case 'myProfile':
            return Axios({
              method: 'get',
              url: myFollowersURL + userID + `/connections`,
              headers: headers()
            })
            .then(response => {
              console.log(response);
              dispatch({
                type: GET_CONNECTIONS,
                connections: response.data.data,
                id: ID,
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

        }
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const followUserConnections = (ID, userID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: connectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      if(response.status === 201) {
        toast.success(`Connection Request Sent`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
        return Axios({
          method: 'get',
          url: myFollowersURL + userID + `/connections`,
          headers: headers()
        })
        .then(response => {
            dispatch({
              type: GET_CONNECTIONS,
              connections: response.data.data
           });
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const getConnections = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: myFollowersURL + ID + `/connections`,
      headers: headers()
    })
    .then(response => {
      console.log(response);
        dispatch({
          type: GET_CONNECTIONS,
          connections: response.data.data,
          id: ID,
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
export const getConnectionsRequests = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getMyConnectionRequestsURL + ID + `/connection_requests`,
      headers: headers()
    })
    .then(response => {
       console.log(response.data.data);
       dispatch({
         type: GET_CONNECTIONS_REQUESTS,
         requests: response.data.data
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


export const acceptConnection = (ID, myID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: acceptConnectionURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      console.log(response);
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: myFollowersURL + ID + `/connections`,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: ACCEPT_CONNECTION,
            connection: response.data.data
          });
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getRecommendedConnections = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getRecommendedConnectionsURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_PEOPLE,
          recUsers: response.data.data
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
export const getAllUsers = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getAllUsersURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_ALL_USERS,
          users: response.data.data
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
export const followUser = (ID, method) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: connectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: getAllUsersURL,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: FOLLOW_USER,
            users: response.data.data
          });
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getMoreUsers = (page, query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getAllUsersURL + page + `&page[size]=20`,
      headers: headers()
      })
    .then(users => {
      if(users.data.data.length === 0) {
        localStorage.setItem('usersEmpty', true);
      }
      dispatch({
        type: GET_MORE_USERS,
        users: users.data.data,
        page: users.data.meta.total_pages
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const followRecommendedConnections = (ID, method) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: connectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      console.log(response);
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: getRecommendedConnectionsURL,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: FOLLOW_REC_USER,
            recUsers: response.data.data
          });
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const followPeopleConnection = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: connectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      if(response.status === 201) {
        return Axios({
          method: 'get',
          url: getRecommendedConnectionsURL,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: FOLLOW_PEOPLE,
            recUsers: response.data.data
          });
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err, 'error');
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};






// NEW NEW
// Unconnect with User
export const disconnectUser = (ID, userID, where) => {
  console.log(userID);
  console.log(ID);
  console.log(where);
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: disconnectUserURL,
      data: { "user_id": ID },
      headers: headers()
    })
    .then(response => {
      if(response.status === 200) {
        toast.success(`Unconnected`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
        switch(where) {
          case 'myProfile':
            return Axios({
              method: 'get',
              url: myFollowersURL + userID + `/connections`,
              headers: headers()
            })
            .then(response => {
              console.log(response, 'from the action');
              dispatch({
                type: GET_CONNECTIONS,
                connections: response.data.data,
                id: userID,
              });
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
          case 'otherUserProfile':
            return Axios({
              method: 'get',
              url: myFollowersURL + userID + `/connections`,
              headers: headers()
            })
            .then(response => {
              console.log(response);
              dispatch({
                type: GET_OTHER_USER_CONNECTIONS,
                connections: response.data.data,
                id: ID,
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
        }
      }
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