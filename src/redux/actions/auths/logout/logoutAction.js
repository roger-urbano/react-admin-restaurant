import axios from 'axios';
import { URL_BACK } from '../../../backend.endpoints';
import { SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE } from '../authTypes';

export const signOutRequest = function () {
    return {
      type: SIGN_OUT_REQUEST,
    };
  };
  
  export const signOutSuccess = function () {
    return {
      type: SIGN_OUT_SUCCESS,
    };
  };
  
  export const signOutFailure = function () {
    return {
      type: SIGN_OUT_FAILURE,
    };
  };

  export const signOutAction = function (history) {
    return function (dispatch) {
      dispatch(signOutRequest());
      // localStorage.clear();  // Limpiar todo el localstorage
      localStorage.removeItem("token");
      history.push("/login");
      if (localStorage.getItem("token")) {
        dispatch(signOutFailure());
      } else {
        dispatch(signOutSuccess());
      }
    };
  };

