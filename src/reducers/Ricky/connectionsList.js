import { GET_CONNECTIONS, GET_OTHER_USER_CONNECTIONS, ACCEPT_CONNECTION } from '../../actions/connection.actions';
import { toast } from "react-toastify";
const initialState = [];

const connectionsList = (state = initialState, action) => {
  switch (action.type){
    case GET_CONNECTIONS:
    console.log(action.connections, "action connections in reducer");
      let connectionsNotMe = action.connections.filter((connection) => {
        return connection.id !== action.id;
      });
      console.log(connectionsNotMe, "Connections Not Me");
      return [ ...connectionsNotMe ];
    case ACCEPT_CONNECTION:
      toast.success(`Connected!`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          pauseOnHover: true,
        });
      return state;
    case GET_OTHER_USER_CONNECTIONS:
    console.log(action.connections);
    console.log(action.id);
      return [ ...action.connections ];
    default:
      return state;
  }
};

export default connectionsList;