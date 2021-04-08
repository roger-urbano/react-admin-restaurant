import axios from 'axios';
import history from '../../../router/History';
import { LOCAL_REQUEST,
          LOCAL_SUCCESS,
          LOCAL_FAILURE,
          LOCAL_DETAIL_REQUEST,
          LOCAL_DETAIL_SUCCESS,
          LOCAL_DETAIL_FAILURE
        } from './localsTypes';
import { URL_BACK } from '../../backend.endpoints';


export const localListAction = (params) => {
  return async (dispatch) => {
    dispatch({ type: LOCAL_REQUEST })
    try {
      const response = await axios.get(`${URL_BACK.LOCALS}`, 
      {
        params: params,
        headers: { 
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      });
      console.log(params)
        dispatch({ type: LOCAL_SUCCESS, payload: response.data });
    }
    catch (error) {
      console.log(error)
      dispatch({ type: LOCAL_FAILURE, payload: error })
    }
  }
};

export const localDetailAction = (id) => {
  console.log("localDetailAction")
  return async (dispatch) => {
    dispatch({ type: LOCAL_DETAIL_REQUEST })
   try {
      const response = await axios.get(`${URL_BACK.LOCALS}/${id}`,
      { headers: {
        'token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }})
      dispatch({type: LOCAL_DETAIL_SUCCESS, payload: response.data })
   } 
   catch (error) {
      dispatch({type: LOCAL_DETAIL_FAILURE, payload: error})
   }
  }
}


// Metodo 2 de disptach Asincrono
// export const loginAction = (dataForm) => async dispatch => {
//   try {
//       const response = await axios.post(`${URL_BACK.AUTH}`, dataForm);
//       localStorage.setItem('token', response.data);
//       dispatch({type: AUTHENTICATION, payload: response.data })
//   }
//   catch (error) {
//       console.log(error)
//   }
// }
// ?_page=1&_limit=3