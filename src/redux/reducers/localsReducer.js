import { LOCAL_REQUEST,
    LOCAL_SUCCESS,
    LOCAL_FAILURE,
    LOCAL_DETAIL_REQUEST,
    LOCAL_DETAIL_SUCCESS,
    LOCAL_DETAIL_FAILURE
} from '../actions/locals/localsTypes';

const initialState = {
    listLocals: [],
    local: {},
    openAlert: false,
    loader: false,
    error: ""
}

const localsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCAL_REQUEST:
            return {
                ...state,
                loader: true
            }
        case LOCAL_SUCCESS:
            return {
                ...state,
                listLocals: action.payload,
                loader: false
            }
        case LOCAL_FAILURE:
            return {
                ...state,
                openAlert: true,
                error: action.payload
            }
        case LOCAL_DETAIL_REQUEST:
            return {
                ...state,
                loader: true
            }
        case LOCAL_DETAIL_SUCCESS:
            return {
                ...state,
                local: action.payload,
                loader: false
            }
        case LOCAL_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload,
                local: {},
                loader: false
            }
        default:
            return {
                ...state,
            }
    }
} 

export default localsReducer