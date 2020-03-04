import produce from 'immer';
import * as actions from '../constants/action-types'

const initState = {
    locations: [],
    loading: false,
    error: {},
    autocomplete: []
}

export default (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actions.ADD_LOCATION:
                draft.locations.push(action.payload);
                break;
            case actions.API_START:
                draft.loading = true;
                break;
            case actions.API_END:
                draft.loading = false;
                break;
            case actions.API_ERROR:
                draft.error = action.payload;
                break;
            case actions.ShowLocations:
                draft.autocomplete = action.payload;
                break;
            default:
                break;
        }
    })