import { Container, Form, Button, Spinner, Card } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import React from "react";
import axios from "axios";

import styles from '../styles/save.module.css';

const getCurrentDate = () => {
    return new Date().toISOString().substring(0, 10);
};

const getPinataLinkFromHash = (hash) => {
    return 'https://gateway.pinata.cloud/ipfs/' + hash;
};

const Save = () => {
    const { ipfsHash } = useParams();
    const navigate = useNavigate();
    const [metadata, setMetadata] = React.useState({
        issuer: "",
        issueDate: getCurrentDate(),
        documentType: "Text",
        issuedTo: "",
        link: getPinataLinkFromHash(ipfsHash)
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [beError, setBeError] = React.useState(null);

    const handleChange = (event) => {
        event.preventDefault();
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        setMetadata(prevState => ({...prevState, [fieldName]: fleldVal}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios.post('http://localhost:8080/save', metadata)
        .then(res => {
            console.log(res);
            navigate('/view/' + res.data.link_hash);
        }).catch(err => {
            setBeError(err.response.data.error);
            setIsLoading(false);
        });
    };

    const handleBackButton = (event) => {
        event.preventDefault();
        navigate('/upload');
    };

    if (isLoading) {
        return(
        <Container fluid className={styles.container}>
            <p>Processing the ETH transaction can take up to a minute</p>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>);
    }

    if (beError) {
        return(
        <Container fluid className={styles.container}>
            <Card>
                <Card.Body>There was an error processing the transaction</Card.Body>
                <Card.Footer>{beError}</Card.Footer>
                <Button onClick={handleBackButton}>Go back</Button>
            </Card>
        </Container>
        );
    }

    return (<Container>
        <Form>
            <Form.Group>
                <Form.Label>Issuer</Form.Label>
                <Form.Control type="text" placeholder="Enter Issuer" 
                    name='issuer' value={metadata.issuer} onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Issue Date</Form.Label>
                <Form.Control type="text" disabled placeholder={getCurrentDate()}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Document Type</Form.Label>
                <Form.Select name='documentType' value={metadata.documentType} onChange={handleChange}>
                    <option>Text</option>
                    <option>Image</option>
                    <option>Pdf</option>
                    <option>Other</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Issued To</Form.Label>
                <Form.Control type="text" placeholder="Enter Issuee" 
                    name='issuedTo' value={metadata.issuedTo} onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control type="text" placeholder={getPinataLinkFromHash(ipfsHash)}  disabled />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save metadata
            </Button>
        </Form>
    </Container>)
};

export default Save;
