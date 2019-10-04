import { CHECK_USERNAME,
         ERROR
       } from '../../actions/auth.actions';

const initialState = {};

const checkUsername = (state = initialState, action) => {
  switch (action.type){
    case CHECK_USERNAME:
      if(action.checkUsername.status === 'username already in use'){
        localStorage.setItem('usernameTaken', true);
        return Object.assign({}, state);
      } else return state;
    case ERROR:
      localStorage.setItem('error', true);
      return Object.assign({}, state, action.type);
    default:
      return state;
  }
};

export default checkUsername;
