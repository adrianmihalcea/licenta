import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { Spinner, Table, Card, Container, Button } from 'react-bootstrap';

import styles from '../styles/view_document.module.css';

const ViewDocument = () =>
{
    const {id} = useParams();
    const navigate = useNavigate();

    const [metadata, setMetadata] = React.useState(null);
    const [qr, setQr] = React.useState(null);

    const handleBackButton = () => {
        navigate('/view');
    }

    React.useEffect(() => {
        async function getImage(link) {
            axios.get('http://localhost:8080/generateQR?link=' + link).then((response) => {
                setQr(response.data.photo);
            });
        }

        async function getMetadata(id) {
            await axios.get('http://localhost:8080/view?id=' + id).then((response) => {
                setMetadata(response.data);
                getImage('http://localhost:3000/view/' + id);
            }).catch((error) => {
                if (error.response.status === 500) {
                    setMetadata({
                        error: 'Internal server error'
                    })
                    getImage('http://localhost:3000/view/' + id);
                }
            });
        }

        getMetadata(id);

    }, [id]);

    if (!metadata || !qr) return(
        <Container fluid className={styles.container}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )

    if (metadata.error) return(
        <Container fluid className={styles.container}>
            <Card style={{
                fontSize: '25pt'
            }}>
                <Card.Body>The server could not retrieve a document with that id</Card.Body>
                <Button onClick={handleBackButton}>Go back</Button>
            </Card>
        </Container>
    );

    return(<Container className={styles.viewContainer}>

    <Card><Card.Body>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Field</th>
            <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>issuer</td><td>{metadata.issuer}</td></tr>
            <tr><td>issuerAddress</td><td>{metadata.issuerAddress}</td></tr>
            <tr><td>issueDate</td><td>{metadata.issueDate}</td></tr>
            <tr><td>documentType</td><td>{metadata.documentType}</td></tr>
            <tr><td>issuedTo</td><td>{metadata.issuedTo}</td></tr>
            <tr><td>link</td><td><a href={metadata.link}>{metadata.link}</a></td></tr>
        </tbody>
        </Table>
    </Card.Body></Card>
    <Card className={styles.qrCard}>
        <Card.Img variant="top" src={qr} />
        <Card.Body>
            <Card.Title>QR code</Card.Title>
            <Card.Text>
                This QR code contains the link to this page. It can be used to validate the document.
            </Card.Text>
        </Card.Body>
    </Card>

    </Container>);
}

export default ViewDocument;
