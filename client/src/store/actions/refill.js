import * as actionTypes from './actionTypes';

export const createRefill = (refill) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = localStorage.getItem('userId');
        firestore.collection('tankownia').add({
            ...refill,
            userId: userId
        }).then(() => {
            dispatch({ type: actionTypes.REFILL_CREATE, refill });
        }).catch((err) => {
            dispatch({ type: actionTypes.REFILL_ERROR, err });
        })
    }
};