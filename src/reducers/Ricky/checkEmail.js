import { CHECK_EMAIL,
         ERROR
       } from '../../actions/auth.actions';

const initialState = {};
// make the reducer DO THE WORK

// SET STATE HERE
// BECOMES this.PROPS.whatever


const checkEmail = (state = initialState, action) => {
  switch (action.type){
    case CHECK_EMAIL:
      if(action.checkEmail.status === 'already in use'){
        localStorage.setItem('emailTaken', true);
        return Object.assign({}, state);
      } else return state;
    case ERROR:
      localStorage.setItem('error', true);
      return Object.assign({}, state, action.type);
    default:
      return state;
  }
};

export default checkEmail;
