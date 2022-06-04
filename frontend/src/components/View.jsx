import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/view.module.css';

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
        setParam(() => ({
          id: event.target.value,
        }));
      }

    return(<Container fluid className={styles.container}>

    <Form className={styles.form}>
        <Form.Label htmlFor="form1">Document Id</Form.Label>
        <Form.Control
            type="text"
            id="form1"
            aria-describedby="description"
            value={param.id}
            onChange={updateParam}
        />
        <Form.Text id="description" muted>
            Provide the hash of the document for which you want to view the metadata<br></br>
        </Form.Text>
        <Button variant="primary" type="submit" id="button1" onClick={submit}>
            Click here to submit form
        </Button>
    </Form>

    </Container>);
}

export default View;
