import axios from 'axios';
import { URL_BACK } from '../../../backend.endpoints';
import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../authTypes';


const signUpRequest = () => {
	return {
	type: SIGN_UP_REQUEST,
	};
};
const signUpSuccess = (token) => {
	return {
	type: SIGN_UP_SUCCESS,
	payload: {
		token,
	},
	};
};

const signUpFailure = (error) => {
	return {
	type: SIGN_UP_FAILURE,
	payload: error,
	};
};

export const signUpAction = (user, history) => {
	console.log("signUpAction")
	return function (dispatch) {
	dispatch(signUpRequest());
	axios({
		method: "post",
		url: URL_BACK.REGISTER,
		data: user,
	})
		.then((response) => {
			const { data } = response;
			dispatch(signUpSuccess(data));
			history.push("/"); // Enviar al login
		})
		.catch((error) => {
			console.log(error);
			dispatch(signUpFailure(error));
		});
	};
};

//   export const loginAction = (dataUser) => {
// 	return async (dispatch) => { 
// 		try {
// 			const response = await axios.post(`${URL_BACK.AUTH}`, dataUser);
// 			localStorage.setItem('token', response.data);
// 			dispatch({type: AUTHENTICATION, payload: response.data })
// 		}
// 		catch (error) {
// 			console.log(error)
// 		}
// 	}
// }