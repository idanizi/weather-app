import React, { } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import { Grid } from '@material-ui/core'
import AutocompleteInput from './components/AutocompleteInput'
import useSelectedLocations from './hooks/useSelectedLocations'
import LocationCard from './components/LocationCard'

function App() {
  const { locations } = useSelectedLocations()
  return (
    <Grid container style={{ margin: '4vh 2vw' }}>
      <Grid container item style={{ marginBottom: '1vh' }} alignContent="stretch" alignItems="stretch">
        <Grid item>
          <AutocompleteInput />
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        {locations
          .map(location =>
            <Grid item key={location.Key}>
              <LocationCard key={location.Key} location={location} />
            </Grid>
          )}
      </Grid>
    </Grid>
  );
}

export default App;