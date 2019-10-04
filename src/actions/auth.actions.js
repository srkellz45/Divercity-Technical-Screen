import Axios from 'axios';
import { url } from '../lib/url';
//import { Redirect } from 'react-router-dom';
import history from '../history';
import { toast } from "react-toastify";
const registerURL = `${url}auth`;
const sign_inURL = `${url}auth/sign_in`;
//const logoutURL = `${url}auth/logout`;
const passwordForgot = `${url}passwords/forgot`;
const checkEmailURL = `${url}users/check_email`;
const checkUsernameURL = `${url}users/check_username`;
const passwordResetURL = `${url}passwords/reset`;


export const SIGNUP = 'SIGNUP';
export const FBOOK_SIGNUP = 'FBOOK_SIGNUP';
export const LINKEDIN_SIGNUP = 'LINKEDIN_SIGNUP';
export const LOGIN = 'LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const PWREQUEST = 'PWREQUEST';
export const CHECK_EMAIL = 'CHECK_EMAIL';
export const CHECK_USERNAME = 'CHECK_USERNAME';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const ALREADY_SOCIAL_LOGIN = 'ALREADY_SOCIAL_LOGIN';
export const ERROR = 'ERROR';


const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});
const storeCredentials = (headers, data) => {
  localStorage.setItem('access-token', headers['access-token']);
  localStorage.setItem('uid', headers.uid);
  localStorage.setItem('client', headers.client);
  localStorage.setItem('id', data.id);
  localStorage.setItem('name', data.attributes.nickname);
};

// export const signup = (registerCreds) => {
//   console.log(registerCreds);
//   return (dispatch) => {
//     return Axios({
//       method: 'post',
//       //url: registerURL,
//       data: `nickname=${registerCreds.nickname}&email=${registerCreds.email}&password=${registerCreds.password}&password_confirmation=${registerCreds.password}&name=${registerCreds.name}`,
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     })
//     .then(response => {
//       const { headers, data: { data } } = response;
//       storeCredentials(headers, data);
//         dispatch({
//           type: SIGNUP,
//           response: response.data
//        });
//       if(response.status === 200) {
//         history.push(`/${response.data.data.id}/onboarding`);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({
//         type: ERROR,
//         error: err
//       });
//     });
//   };
// };

export const facebookRegister = (token) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: `${ url }auth/sso/facebook?token=${token}`
    })
    .then((response) => {
      const { headers, data: { data } } = response;
      storeCredentials(headers, data);
      dispatch({
        type: FBOOK_SIGNUP,
        userDetails: response.data
      });
      if(response.data.data.attributes.account_type) { // if the user is already registered
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', response.data.data.attributes.name);
        history.push(`/feed`);
      } else if(response.status === 200) {
        history.push(`/${response.data.data.id}/onboarding`);
      }
    })
    .catch((err) => {
      console.log(err, "err");
      dispatch({
        type: LOGIN_ERROR,
        error: 'Facebook Oauth Error'
      });
    });
  };
};

export const linkedInRegister = (token, state) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: `${ url }auth/sso/linkedin?code=${token}&state=${state}`
    })
    .then((response) => {
      const { headers, data: { data } } = response;
      storeCredentials(headers, data);
      dispatch({
        type: LINKEDIN_SIGNUP,
        userDetails: response.data
      });
      if(response.data.data.attributes.account_type) { // if the user is already registered
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', response.data.data.attributes.name);
        history.push(`/feed`);
      } else if(response.status === 200) {
        history.push(`/${response.data.data.id}/onboarding`);
      }
    })
    .catch((err) => {
      console.log(err, "err");
      dispatch({
        type: LOGIN_ERROR,
        error: 'linkedin Oauth Error'
      });
    });
  };
};

export const linkedInLogin = (token, state) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: `${ url }auth/sso/linkedin?code=${token}&state=${state}`
    })
    .then((response) => {
      const { headers, data: { data } } = response;
      storeCredentials(headers, data);
      dispatch({
        type: LOGIN,
        userDetails: response.data
      });
      if(response.status === 200) {
        history.push(`/feed`);
      }
    })
    .catch((err) => {
      console.log(err, "err");
      dispatch({
        type: LOGIN_ERROR,
        error: 'Facebook Oauth Error'
      });
    });
  };
};

export const login = (userCreds) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: sign_inURL,
      data: `email=${userCreds.email}&password=${userCreds.password}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then((response) => {
      const { headers, data: { data } } = response;
      storeCredentials(headers, data);
      dispatch({
        type: LOGIN,
        userDetails: response.data
      });
      if(response.status === 200) {
        history.push(`/feed`);
      }
    })
    .catch((err) => {
      console.log("err");
      dispatch({
        type: LOGIN_ERROR,
        error: 'invalid user name or password'
      });
      history.push('/');
    });
  };
};

export const facebookLogin = (token) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: `${ url }auth/sso/facebook?token=${token}`
    })
    .then((response) => {
      const { headers, data: { data } } = response;
      storeCredentials(headers, data);
      dispatch({
        type: LOGIN,
        userDetails: response.data
      });
      if(response.status === 200) {
        history.push(`/feed`);
      }
    })
    .catch((err) => {
      console.log(err, "err");
      dispatch({
        type: LOGIN_ERROR,
        error: 'Facebook Oauth Error'
      });
    });
  };
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  history.push('/');
  dispatch({
   type: USER_LOGOUT
  });
};


export const pwRequest = (email) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: passwordForgot,
      data: { email },
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if(response.data.status === "ok"){
          toast.success(`An email has been sent to ${email}, please follow the link inside to reset your password`, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            pauseOnHover: true,
        });
      }

    })
    .catch((err) => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};
export const pwReset = (token, password) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: passwordResetURL,
      data: {
        "password": password,
        "token": token
      },
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
        history.push(`/`);
        toast.success(`Password Reset!`, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            pauseOnHover: true,
        });
    })
    .catch((err) => {
      toast.error(`Something went wrong`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};

export const checkRegister = (email, username, registerCreds) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: checkEmailURL,
      headers: { 'Content-Type': 'application/json' },
      data: email
    })
    .then((response) => {
      if(response.data.status === 'User with this email is already signed up via social login. In order to be able to sign in via email please sign in via any method you used previously (facebook or twitter) and set a password on the Settings page.') {
        dispatch({
          type: ALREADY_SOCIAL_LOGIN,
          notice: response.data
        });
        history.push(`/`);
      }
      if(response.data.status === 'already in use'){
          dispatch({
          type: CHECK_EMAIL,
          checkEmail: response.data
        });
      } else if(response.data.status === 'free'){
        return Axios({
          method: 'post',
          url: checkUsernameURL,
          headers: { 'Content-Type': 'application/json' },
          data: username
        })
        .then((response) => {
          if(response.data.status === 'username already in use'){
            dispatch({
              type: CHECK_USERNAME,
              checkUsername: response.data
            });
          } else if(response.data.status === 'free'){
              return Axios({
                method: 'post',
                url: registerURL,
                data: `nickname=${registerCreds.nickname}&email=${registerCreds.email}&password=${registerCreds.password}&password_confirmation=${registerCreds.password}&name=${registerCreds.name}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              })
              .then(response => {
              const { headers, data: { data } } = response;
              storeCredentials(headers, data);
              dispatch({
                type: SIGNUP,
                response: response.data
                });
              if(response.status === 200) {
                history.push(`/${response.data.data.id}/onboarding`);
                }
              })
              .catch(err => {
                console.log(err);
                dispatch({
                  type: ERROR,
                  error: err
                });
              });
            }
          });
        }
      })
      .catch((err) => {
        toast.error(`Something went wrong`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
        console.log(err);
        dispatch({
          type: ERROR,
          error: 'Email Taken'
        });
      });
  };
};

// export const checkUsername = (username) => {
//   return (dispatch) => {
//     return Axios({
//       method: 'post',
//       url: checkUsernameURL,
//       headers: { 'Content-Type': 'application/json' },
//       data: username
//     })
//     .then((response) => {
//       console.log(response.data);
//       dispatch({
//         type: CHECK_USERNAME,
//         checkUsername: response.data
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERROR,
//         error: 'Email Taken'
//       });
//     });
//   };
// };