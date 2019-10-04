import { SAVE_JOB, GET_SAVED_JOBS, DELETE_SAVED_JOB, EMPTY_LIST } from '../../actions/job.actions';
import { toast } from "react-toastify";
const initialState = [];

const savedJobsList = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_JOB:
      toast.success(`${action.saveJob.attributes.title} saved!`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      return [ ...state, action.saveJob];
    case GET_SAVED_JOBS:
      return [ ...action.savedJobs ];
    case DELETE_SAVED_JOB:
      toast.info(`${action.deleteJob.attributes.title} no longer saved`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: true,
      });
      let removedSave = state.filter((job) => {
        return job.id !== action.deleteJob.id;
      });
      return [ ...removedSave ];
    case EMPTY_LIST:
      localStorage.setItem("empty", true);
      return state;
    default:
      return state;
  }
};

export default savedJobsList;
