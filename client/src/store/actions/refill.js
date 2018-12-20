import * as actionTypes from './actionTypes';
import axios from '../../axios-refills';

export const sendRefillSuccess = (id, refillData) => {
    return {
        type: actionTypes.SEND_REFILL_SUCCESS,
        refillId: id,
        refillData: refillData
    }
};

export const sendRefillFail = (error) => {
    return {
        type: actionTypes.SEND_REFILL_FAIL,
        error: error
    }
};

export const sendRefillStart = () => {
    return {
        type: actionTypes.SEND_REFILL_START
    }
};

export const sendRefill = (refillData) => {
    return dispatch => {
        dispatch(sendRefillStart());
        axios.post('/tankowania.json', refillData)
            .then(response => {
                dispatch(sendRefillSuccess(response.data.name, refillData));
            })
            .catch(error => {
                dispatch(sendRefillFail(error));
            });
    }
};

export const sendInit = () => {
    return {
        type: actionTypes.SEND_INIT
    }
};

export const fetchRefillsSuccess = (refills) => {
    return {
        type: actionTypes.FETCH_REFILLS_SUCCESS,
        refills: refills
    }
};

export const fetchRefillsFail = (error) => {
    return {
        type: actionTypes.FETCH_REFILLS_FAIL,
        error: error
    }
};

export const fetchRefillsStart = () => {
    return {
        type: actionTypes.FETCH_REFILLS_START
    }
};

export const fetchRefills = () => {
    return dispatch => {
        dispatch(fetchRefillsStart());
        //const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/tankowania.json')
            .then(res => {
                const fetchedRefills = [];
                for (let key in res.data) {
                    fetchedRefills.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchRefillsSuccess(fetchedRefills));
            })
            .catch(err => {
                dispatch(fetchRefillsFail(err))
            })
    }
};