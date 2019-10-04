import { LOGIN,
         SIGNUP,
         FBOOK_SIGNUP,
         LINKEDIN_SIGNUP,
         CHECK_EMAIL,
         CHECK_USERNAME,
         LOGIN_ERROR,
         ALREADY_SOCIAL_LOGIN,
         ERROR
       } from '../../actions/auth.actions';

const initialState = {};

const auth = (state = initialState, action) => {
  switch (action.type){
    case LOGIN:
      const userDetails = action.userDetails;
      let newState = {};
      newState = action.userDetails;
      localStorage.setItem('userId', userDetails.data.id);
      localStorage.setItem('username', userDetails.data.attributes.name);
      localStorage.setItem('role', userDetails.data.attributes.account_type);
      localStorage.setItem('loggedIn', true);
      return Object.assign({loggedIn: true}, state, newState);
    case SIGNUP:
      if (action.response.success) {
        localStorage.setItem('registering', true);
      }
      return Object.assign({loggedIn: true}, state, initialState);
    case FBOOK_SIGNUP:
      if (action.userDetails.status === 'success') {
        localStorage.setItem('fbook_register', true);
        return Object.assign({register: true}, state, initialState);
      }
      return Object.assign({}, state, initialState);
    case LINKEDIN_SIGNUP:
      return Object.assign({register: true}, state, initialState);
    case CHECK_EMAIL:
      return Object.assign({}, state, action.checkEmail);
    case CHECK_USERNAME:
      return Object.assign(action.checkUsername, initialState);
    case LOGIN_ERROR:
      localStorage.setItem('login_error', true);
      return state;
    case ALREADY_SOCIAL_LOGIN:
      localStorage.setItem('alreadySocial', 'yes');
      return state;
    case ERROR:
      localStorage.setItem('error', true);
      return Object.assign({}, state, action.type);
    default:
      return state;
  }
};

export default auth;


// const initialState = { loggedIn: !!localStorage.getItem('access-token'), signup: false };
// /* eslint-disable consistent-return */
// const auth = (state = initialState, action) => {
//   console.log(action.type);
//   switch (action.type) {
//     case 'LOGIN':
//       if(action.error) {
//         return Object.assign({}, state, { loggedIn: false, error: action.error });
//       }
//       return { loggedIn: true };
//     case 'SIGNUP':
//       if(action.error) {
//         return Object.assign({}, state, { loggedIn: false, error: action.error });
//       }
//       return { loggedIn: true };
//     case 'LOGOUT':
//       return Object.assign({}, state, { loggedIn: false });
//     case 'TOGGLE_SIGNUP':
//       return Object.assign({}, state, { signup: !state.signup });
//     default:
//       return state;
//   }
// };

// export default auth;