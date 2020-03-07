import * as actionTypes from '../constants/action-types';

export const apiStart = () =>
    ({ type: actionTypes.API_START })

export const apiEnd = () =>
    ({ type: actionTypes.API_END })

export const apiError = (error) => {
    return { type: actionTypes.API_ERROR, payload: error }
}
export const addLocation = (location) =>
    ({ type: actionTypes.ADD_LOCATION, payload: location })

export const showLocations = locations =>
    ({ type: actionTypes.ShowLocations, payload: locations })

export const toast = message =>
    ({ type: actionTypes.toast, payload: message })

export const fetchLocation = (textQuery) =>
    ({
        type: actionTypes.API,
        payload: {
            url: 'locations/v1/cities/autocomplete',
            queryParams: { q: textQuery },
            onSuccess: data => showLocations(data),
            onFailure: data => toast(data.message || data)
        }
    })

export const removeLocation = (location) => ({
    type: actionTypes.REMOVE_LOCATION,
    payload: location,
})

export const apiCall = ({ url, body = undefined, urlParams = [],
    queryParams = {}, method = 'GET', onSuccess, onFailure }) =>
    ({
        type: 'API',
        payload: {
            url,
            body,
            urlParams,
            queryParams,
            method,
            onSuccess,
            onFailure
        }
    })

export const fetchForecast = (location) =>
    apiCall({
        url: 'currentconditions/v1/',
        urlParams: [location.Key],
        onSuccess: forecast => ({
            type: actionTypes.SET_LOCATION_FORECAST,
            payload: {location, forecast}
        })
    })