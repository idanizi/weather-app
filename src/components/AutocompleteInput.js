import React, { useState, useCallback } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAutocompleteLocations from '../hooks/useAutocompleteLocations'
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addLocation, removeLocation } from '../redux/actions'
import _ from 'lodash'

export function useSelectedLocations() {
    const locations = useSelector(state => state.locations)

    return {
        locations,
        addLocation: useCallback(bindActionCreators(addLocation)),
        removeLocation: useCallback(bindActionCreators(removeLocation))
    }
}

function AutocompleteInput() {
    const { list, loading, search } = useAutocompleteLocations()
    const [inputValue, setInputValue] = useState("");
    const { locations, addLocation, removeLocation } = useSelectedLocations()
    // const [valueArray, setValueArray] = useState([])

    const handleChange = (event, valueArray) => {
        _.difference(valueArray, locations).forEach(item => addLocation(item))
        _.difference(locations, valueArray).forEach(item => removeLocation(item))

        return locations;
    }

    return (
        <>
            <Autocomplete
                multiple
                filterSelectedOptions
                autoComplete
                style={{ width: 300 }}
                getOptionSelected={(option, value) => option.key === value.key}
                getOptionLabel={option => option.LocalizedName}
                options={list}
                loading={loading}
                value={locations}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={(_, value) => { setInputValue(value); search(value) }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Search City..."
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </>
    )
}

export default AutocompleteInput
