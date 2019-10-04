import Axios from 'axios';
import { url } from '../lib/url';
//import history from '../history';

const getIndustriesURL = `${url}data/industries?page[number]=0&page[size]=30&search_query=`;

export const GET_INDUSTRIES = 'GET_INDUSTRIES';

export const ERROR = 'ERROR';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});

export const loadIndustries = (query) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getIndustriesURL + query,
      headers: headers()
    })
    .then(response => {
      console.log(response);
        dispatch({
          type: GET_INDUSTRIES,
          industries: response.data.data
       });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


