import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const View = () =>
{
    const navigate = useNavigate();
    const [param, setParam] = useState({id: ''});

    const submit = (event) => {
        event.preventDefault();
        navigate('/view/' + param.id);
    }

    const updateParam = (event) => {
        event.preventDefault();
        setParam((prevState) => ({
          id: event.target.value,
        }));
      }

    return(<div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '75vh'
    }} >

    <Form>
        <Form.Label htmlFor="form1">Document Id</Form.Label>
        <Form.Control
            type="text"
            id="form1"
            aria-describedby="description"
            value={param.id}
            onChange={updateParam}
        />
        <Form.Text id="description" muted>
            Provide the hash of the document for which you want to view the metadata
        </Form.Text>
        <Button variant="primary" type="submit" id="button1" onClick={submit}>
            Click here to submit form
        </Button>
    </Form>

    </div>);
}

export default View;
