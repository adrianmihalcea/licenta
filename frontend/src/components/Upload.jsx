import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Upload = () =>
{
    const [file, setFile] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        event.preventDefault();
        setFile(event.target.files[0]);
    }

    const submit = (event) => {
        event.preventDefault();
        navigate('/view/' + 'temp');
    }

    return (<Container>
        <Form>
        <Form.Label htmlFor="form1">Document ID</Form.Label>
        <Form.Control
            type="file"
            id="form1"
            aria-describedby="description"
            value={file}
            onChange={handleChange}
        />
        <Form.Text id="description" muted>
            Please provide the hash of the document for which you want to view the metadata<br></br>
        </Form.Text>
        <Button variant="primary" type="submit" id="button1" onClick={submit}>
            Click here to submit form
        </Button>
    </Form>
    </Container>

        // <div className="App">
        //     <form>
        //     <h1>React File Upload</h1>
        //     <input type="file" onChange={handleChange}/>
        //     <button type="submit">Upload</button>
        //     </form>
        // </div>
    );
}

export default Upload;
