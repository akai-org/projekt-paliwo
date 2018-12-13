import * as actionTypes from './actionTypes';

export const createRefill = (refill) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: actionTypes.REFILL_CREATE, refill });
    }
};