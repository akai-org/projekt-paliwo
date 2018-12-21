import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    users: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_USERS_SUCCESS:
            return updateObject(state, {
                users: action.users,
                loading: false
            });
        case actionTypes.FETCH_USERS_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

export default reducer;