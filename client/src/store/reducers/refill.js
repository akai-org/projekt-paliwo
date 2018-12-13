import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REFILL_CREATE:
            console.log('Create ', action.refill);
            return state;
        case actionTypes.REFILL_ERROR:
            console.log('Error ', action.err);
            return state;
        default:
            return state;
    }
};

export default reducer;