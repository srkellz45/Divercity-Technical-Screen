import { GET_MY_JOBS, GET_MORE_JOBS, PUBLISH_JOB, UN_PUBLISH_JOB, DELETE_JOB } from '../../actions/recruiter.actions';
import { EDIT_JOB } from '../../actions/recruiter.actions.js';
import { toast } from "react-toastify";
const initialState = [];

const myJobsList = (state = initialState, action) => {
  switch(action.type) {
    case GET_MY_JOBS:
      return [ ...action.myJobs ];
    case GET_MORE_JOBS:
      let newState = {};
      newState = action.myJobs;
      localStorage.setItem('pageLimit', action.page);
      return [...state, ...newState];
    case PUBLISH_JOB:
      toast.info(`${action.publish.attributes.title} published!`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      let removePublish = state.filter((job) => {
        return job.id !== action.publish.id;
      });
      return [ action.publish, ...removePublish ];
    case UN_PUBLISH_JOB:
      toast.info(`${action.unPublish.attributes.title} successfully unpublished!`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      let removeUnpublish = state.filter((job) => {
        return job.id !== action.unPublish.id;
      });
      return [ action.unPublish, ...removeUnpublish ];
    case EDIT_JOB:
      let editJob = state.filter((job) => {
        return job.id !== action.editedJob.id;
      });
      return [ action.editedJob, ...editJob ];
    case DELETE_JOB:
      toast.success(`${action.deletedJob.attributes.title} deleted`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      let removeDeleted = state.filter((job) => {
        return job.id !== action.deletedJob.id;
      });

      return [ ...removeDeleted ];
    default:
      return state;
  }
};

export default myJobsList;