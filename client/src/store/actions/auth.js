import * as actionTypes from './actionTypes';
import axios from 'axios';
import axiosRefills from '../../axios-refills';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const sendUserData = (token, userData) => {
    return dispatch => {
        axiosRefills.post('/uzytkownicy.json?auth=' + token, userData)
            .then(response => {
                dispatch(sendRegisterSuccess(response.data.name, userData));
            })
            .catch(error => {
                dispatch(sendRegisterFail(error));
            });
    }
};

export const sendRegisterSuccess = (id, userData) => {
    return {
        type: actionTypes.SEND_REGISTER_SUCCESS,
        userData: userData,
        userId: id
    }
};

export const sendRegisterFail = (error) => {
    return {
        type: actionTypes.SEND_REGISTER_FAIL,
        error: error
    }
};

export const register = (email, password, userData) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD5Ha41-GS3A6u_Gnb3OOyfn0w0n4fs2W8';
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(sendUserData(response.data.idToken, userData));
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                //console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD5Ha41-GS3A6u_Gnb3OOyfn0w0n4fs2W8';
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                //console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};