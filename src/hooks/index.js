import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addLocation, removeLocation, fetchForecast } from '../redux/actions'

export function useForecast(location) {
    const dispatch = useDispatch()
    const [forecast, setForecast] = useState(null)
    const locationsToForecastsMap = useSelector(state => state.locationsToForecastsMap)
    useEffect(() => {
        dispatch(fetchForecast(location))
    }, [location, dispatch])

    useEffect(() => {
        setForecast(locationsToForecastsMap.get(location)?.[0])
    }, [locationsToForecastsMap.size, location, locationsToForecastsMap])

    return forecast;
}

export function useIcon(forecast){
    if(!forecast) return null;
    const {WeatherIcon: iconNumber} = forecast
    const numberString = (iconNumber < 10? '0' : '') + iconNumber
    return `https://developer.accuweather.com/sites/default/files/${numberString}-s.png`;
}

export { default as useAutocompleteLocations } from './useAutocompleteLocations'
export { default as useSelectedLocations } from './useSelectedLocations'