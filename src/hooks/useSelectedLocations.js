import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addLocation, removeLocation } from '../redux/actions'

export default function useSelectedLocations() {
    const locations = useSelector(state => state.locations)
    const dispatch = useDispatch()

    return {
        locations,
        addLocation: useCallback((location) => dispatch(addLocation(location)), [dispatch]),
        removeLocation: useCallback((location) => dispatch(removeLocation(location)), [dispatch])
    }
}
