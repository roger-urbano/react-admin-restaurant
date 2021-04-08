import axios from 'axios';
import { URL_BACK } from '../../../backend.endpoints';
import { SIGN_IN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from '../authTypes';

const signInRequest = () => {
	return {
	  type: SIGN_IN_REQUEST,
	};
  };
  const signInSuccess = (token) => {
	return {
	  type: SIGN_IN_SUCCESS,
	  payload: {
		token,
	  },
	};
  };
  const signInFailure = (error) => {
	return {
	  type: SIGN_IN_FAILURE,
	  payload: error,
	};
  };
  
  export const signInAction = (payload, history) => {
	console.log("signInAction")
	return function (dispatch) {
	  dispatch(signInRequest);
	  axios({
		method: "post",
		url: `${URL_BACK.AUTH}`,
		data: payload,
		headers: {
			token: localStorage.getItem("token"),
			// token: `Bearer ${localStorage.getItem("token")}`,
		},
	  })
		.then((response) => {
		  const { data } = response;
		  localStorage.setItem("token", data);
		  dispatch(signInSuccess(data));
		  history.push("/admin/locals"); // Envía al Login
		})
		.catch((error) => {
		  dispatch(signInFailure(error));
		});
	};
  };