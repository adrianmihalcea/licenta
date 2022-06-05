import axios from 'axios';
import { useState } from 'react';
import { Container, Spinner, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/upload.module.css';

const Upload = () =>
{
    const [file, setFile] = useState('');
    const [spinnerFlag, setSpinnerFlag] = useState(false);
    const [ipfsHash, setIpfsHash] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        event.preventDefault();
        setFile(event.target.files[0]);
    }

    function handleFinalise(event) {
        event.preventDefault();
        navigate('/save/' + ipfsHash);
    }

    const submit = (event) => {
        event.preventDefault();
        console.log(file);
        setSpinnerFlag(true);
        var formData = new FormData();
        formData.append("file", file);
        axios.post('http://localhost:8080/pin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            setSpinnerFlag(false);
            setIpfsHash(response.data.IpfsHash);
        }).catch((error) => {
            console.log(error);
        });
    }

    if (spinnerFlag) {
        return (
        <Container fluid className={styles.container}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
        );
    }

    if (ipfsHash) {
        return (<Container className={styles.container}>
            <Card>
                <Card.Title>Successful IPFS upload</Card.Title>
                <Card.Body>ipfsHash: {ipfsHash}</Card.Body>
                <Card.Footer>Proceed below to add metadata and finalise the certification</Card.Footer>
                <Button variant="primary" onClick={handleFinalise}>Finalise</Button>
            </Card>
        </Container>);
    }

    return (<Container className={styles.container}>
        <Card className={styles.card}>
            <Card.Title>File upload</Card.Title>
            <Card.Body>Upload the document to be certified.</Card.Body>
            <Card.Footer>You may want to password-protect this document</Card.Footer>
            <form>
                <input type="file" onChange={handleChange}/>
                <Button variant="primary" type="submit" onClick={submit}>Upload</Button>
            </form>
        </Card>
    </Container>);
}

export default Upload;
