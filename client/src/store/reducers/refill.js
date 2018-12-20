import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    refills: [],
    loading: false,
    allowSend: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_INIT:
            return updateObject(state, {
                allowSend: false
            });
        case actionTypes.SEND_REFILL_START:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.SEND_REFILL_SUCCESS:
            const newRefill = updateObject(action.refillData, { id: action.refillId });
            return updateObject(state,{
                loading: false,
                allowSend: true,
                refills: state.refills.concat(newRefill)
            });
        case actionTypes.SEND_REFILL_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.FETCH_REFILLS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_REFILLS_SUCCESS:
            return updateObject(state, {
                refills: action.refills,
                loading: false
            });
        case actionTypes.FETCH_REFILLS_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

export default reducer;