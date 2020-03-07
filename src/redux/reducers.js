import produce from 'immer';
import * as actionTypes from '../constants/action-types'
import _ from 'lodash'

const initState = {
    locations: [],
    loading: false,
    error: null,
    autocomplete: [],
    locationsToForecastsMap: new Map(),
}

export default (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case actionTypes.ADD_LOCATION:
                draft.locations.push(action.payload);
                break;
            case actionTypes.API_START:
                draft.loading = true;
                break;
            case actionTypes.API_END:
                draft.loading = false;
                break;
            case actionTypes.API_ERROR:
                console.log('setting error:', action.payload)
                draft.error = action.payload;
                break;
            case actionTypes.ShowLocations:
                draft.autocomplete = action.payload;
                break;
            case actionTypes.REMOVE_LOCATION:
                draft.locations = _.remove(draft.locations, x => action.payload === x)
                draft.locationsToForecastsMap.delete(action.payload);
            break;
            case actionTypes.SET_LOCATION_FORECAST:
                const {location, forecast} = action.payload
                draft.locationsToForecastsMap.set(location, forecast);
                break;
            default:
                break;
        }
    })