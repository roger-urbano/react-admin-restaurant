import { combineReducers } from 'redux';
import localsReducer from './localsReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    locals: localsReducer,
    auth: authReducer
});

export default rootReducer;