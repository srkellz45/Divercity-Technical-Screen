import { GET_DOCUMENTS, DELETE_RESUME } from '../../actions/user.actions';
import { toast } from "react-toastify";
const initialState = [];

const documentsList = (state = initialState, action) => {
  switch (action.type){
    case GET_DOCUMENTS:
      return [ ...action.documents ];
    case DELETE_RESUME:
        toast.info(`Resume Deleted`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
      let removedApplication = state.filter((documents) => {
        return documents.id !== action.resumeID;
      });
      return [ ...removedApplication ];

    default:
      return state;
  }
};

export default documentsList;