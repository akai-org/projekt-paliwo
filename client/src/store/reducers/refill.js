import * as actionTypes from '../actions/actionTypes';

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.REFILL_CREATE: return state;
        default:
            return state;
    }
};

export default reducer;