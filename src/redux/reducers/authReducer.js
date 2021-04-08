import { 
  SIGN_IN_REQUEST, 
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE, 
  SIGN_UP_REQUEST, 
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE

} from '../actions/auths/authTypes';
import jwt from "jsonwebtoken";


export const isValidToken = (token) => {
    let decoded = jwt.decode(token);
    return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
  };

  const initialState = {
    currentUser: localStorage.getItem("token")
      ? isValidToken(localStorage.getItem("token"))
      : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    error: "",
    loading: false,
    isAuthenticated: false,
  };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
        case SIGN_IN_REQUEST:
        case SIGN_OUT_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
                token: action.payload,
                isAuthenticated: true,
              };
        case SIGN_UP_FAILURE:
        case SIGN_IN_FAILURE:
        case SIGN_OUT_FAILURE:
            return {
                ...state,
                currentUser: null,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
              };
        case SIGN_OUT_SUCCESS:
          // localStorage.removeItem("token");
          return {
            ...state,
            isAuthenticated: false,
            loading: false,
            currentUser: null,
            token: "",
          };
        default:
            return {
                ...state
            }
    }

}

export default authReducer