import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    users: [],
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const registerSuccess = (state, action) => {
    const newUser = updateObject(action.userData, { id: action.userId });
    return updateObject(state,{
        loading: false,
        allowSend: true,
        users: state.users.concat(newUser)
    });
};

const registerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null})
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.SEND_REGISTER_FAIL: return registerFail(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;