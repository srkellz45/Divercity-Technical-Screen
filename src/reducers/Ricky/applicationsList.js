import { GET_MY_APPLICATIONS, CANCEL_APPLICATION } from '../../actions/user.actions';
import { APPLY } from '../../actions/job.actions';

import { toast } from "react-toastify";
const initialState = [];

const applicationsList = (state = initialState, action) => {
  switch (action.type){
    case APPLY:
      toast.success(`Application for ${action.apply.attributes.job_title} sent!`, {
        position: toast.POSITION.TOP_CENTER
      });
      return [ ...state, action.apply ];
    case GET_MY_APPLICATIONS:
      return [ ...action.applications ];
    case CANCEL_APPLICATION:
        toast.success(`Application Cancelled`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
      let removedApplication = state.filter((applications) => {
        let id = applications.attributes.job_id.toString();
        return id !== action.applicationID;
      });
      return [ ...removedApplication ];
    default:
      return state;
  }
};

export default applicationsList;