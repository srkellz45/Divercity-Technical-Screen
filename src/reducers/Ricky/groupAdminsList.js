import { LOAD_GROUP_ADMINS } from '../../actions/group.actions';

const initialState = [];

const groupAdminsList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GROUP_ADMINS:
      return [ ...action.admin ];
    default:
      return state;
  }
};

export default groupAdminsList;