import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAutocompleteLocations from '../hooks/useAutocompleteLocations'
import useSelectedLocations from '../hooks/useSelectedLocations'
import _ from 'lodash'

function AutocompleteInput() {
    const { list, loading, search } = useAutocompleteLocations()
    const [inputValue, setInputValue] = useState("");
    const { locations, addLocation, removeLocation } = useSelectedLocations()

    const handleChange = (event, valueArray) => {
        _.difference(valueArray, locations).forEach(item => addLocation(item))
        _.difference(locations, valueArray).forEach(item => removeLocation(item))
        return locations;
    }

    return (
            <Autocomplete
                multiple
                filterSelectedOptions
                autoComplete
                style={{ width: 300 }}
                getOptionLabel={option => option?.LocalizedName }
                options={list}
                loading={loading}
                value={locations}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={(e, value, reason) => {
                    setInputValue(value);
                    if (reason === "input") search(value)
                }}
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
    )
}

export default AutocompleteInput
