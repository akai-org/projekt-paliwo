import * as actionTypes from "./actionTypes";
import axios from "../../axios-refills";

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    }
};

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
};

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
};

export const fetchUsers = (token, userId) => {
    return dispatch => {
        dispatch(fetchUsersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/uzytkownicy.json' + queryParams)
            .then(res => {
                const fetchedUsers = [];
                for (let key in res.data) {
                    fetchedUsers.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchUsersSuccess(fetchedUsers));
            })
            .catch(err => {
                dispatch(fetchUsersFail(err))
            })
    }
};