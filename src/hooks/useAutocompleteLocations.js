import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocation } from '../redux/actions'
import _ from 'lodash'

export default function useAutocompleteLocations() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const list = useSelector(state => state.autocomplete)
    const loading = useSelector(state => state.loading);
  
    const debounceFetchLocations = useCallback(
      _.debounce((query) => dispatch(fetchLocation(query)), 1000),
      [dispatch])
  
    return {
      query,
      search: query => {
        setQuery(query);
        debounceFetchLocations(query);
      },
      list,
      loading,
    }
  }