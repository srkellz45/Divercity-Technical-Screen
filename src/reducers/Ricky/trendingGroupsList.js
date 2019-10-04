import { LOAD_TRENDING_GROUPS } from '../../actions/group.actions';

const initialState = [];

const trendingGroupsList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_TRENDING_GROUPS:
      return [ ...action.groups ];
    default:
      return state;
  }
};

export default trendingGroupsList;