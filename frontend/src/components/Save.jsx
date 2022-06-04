import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import React from "react";

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
    const [redirectFlag, setRedirectFlag] = React.useState(true);

    const handleChange = (event) => {
        event.preventDefault();
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        setMetadata(prevState => ({...prevState, [fieldName]: fleldVal}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(metadata);
        console.log(redirectFlag);
    };

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
                <Form.Control type="text" placeholder="Enter Issuee" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Link</Form.Label>
                <Form.Control type="text" placeholder={getPinataLinkFromHash(ipfsHash)}  disabled />
            </Form.Group>

            <Form.Group>
                <Form.Check type="checkbox" label="Redirect to view page" defaultChecked onChange={
                    (event) => {
                        setRedirectFlag(event.target.checked);
                    }
                }/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save metadata
            </Button>
        </Form>
    </Container>)
};

export default Save;
