import React, { useState, useCallback } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAutocompleteLocations from '../hooks/useAutocompleteLocations'
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addLocation, removeLocation } from '../redux/actions'

export function useSelectedLocations() {
    const locations = useSelector(state => state.locations)

    return {
        locations,
        addLocation: useCallback(bindActionCreators(addLocation)),
        removeLocation: useCallback(bindActionCreators(removeLocation))
    }
}

function AutocompleteInput() {
    // const [open, setOpen] = useState(false)
    const { list, loading, search } = useAutocompleteLocations()
    const [inputValue, setInputValue] = useState("");
    const { locations, addLocation, removeLocation } = useSelectedLocations()
    const [value, setValue] = useState([])

    return (
        <>
            <Autocomplete
                multiple
                filterSelectedOptions
                autoComplete
                style={{ width: 300 }}
                // open
                // onOpen={() => {
                //     setOpen(true);
                // }}
                // onClose={() => {
                //     setOpen(false);
                // }}
                getOptionSelected={(option, value) => option.key === value.key}
                getOptionLabel={option => option.LocalizedName}
                options={list}
                loading={loading}
                value={value}
                onChange={(e, value) => setValue(value)}
                // onSelect={(e) => e.}
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
