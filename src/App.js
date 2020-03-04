import React, { useState, useCallback, useMemo } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocation } from './redux/actions';
import _ from 'lodash';

function App() {
  const { value, setValue, list } = useAutocompleteLocations();

  return (
    <Container>
      <MyInput {...{ value, setValue }} />
      <pre>
        {JSON.stringify(list, null, 2)}
      </pre>
    </Container>
  );
}

export default App;

export function useAutocompleteLocations() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const list = useSelector(state => state.autocomplete)

  const debounceFetchLocations = useCallback(
    _.debounce((query) => dispatch(fetchLocation(query)), 1000),
    [dispatch])

  return {
    value: query,
    setValue: query => {
      setQuery(query);
      debounceFetchLocations(query);
    },
    list,
  }
}

const MyInput = ({ value, setValue }) => {


  const handleOnChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  }
  return <Form>
    <Form.Group>
      <Form.Control type="text" placeholder={"Search..."}
        value={value}
        onChange={handleOnChange} />
    </Form.Group>
  </Form>
}

