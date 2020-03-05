import React, { } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import useAutocompleteLocations from './hooks/useAutocompleteLocations';
import AutocompleteInput from './components/AutocompleteInput'

function App() {
  const { list } = useAutocompleteLocations();

  return (
    <Container style={{margin: '4vh 2vw'}}>
      <Col>
        <Row>
          <AutocompleteInput />
        </Row>
        <Row>
          <pre>
            {JSON.stringify(list, null, 2)}
          </pre>
        </Row>
      </Col>
    </Container>
  );
}

export default App;



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

