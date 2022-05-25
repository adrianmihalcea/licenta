import { useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { Spinner, Table, Card, Button } from 'react-bootstrap';

const ViewDocument = () =>
{
    const {id} = useParams();

    const [metadata, setMetadata] = React.useState(null);
    const [qr, setQr] = React.useState(null);

    React.useEffect(() => {
        async function getImage(link) {
            axios.get('http://localhost:8080/generateQR?link=' + link).then((response) => {
                setQr(response.data.photo);
            });
        }

        async function getMetadata(id) {
            await axios.get('http://localhost:8080/view?id=' + id).then((response) => {
                setMetadata(response.data);
                getImage(response.data.link);
            });
        }

        getMetadata(id);

    }, [id]);

    if (!metadata || !qr) return(
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )

    return(<>

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
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={qr} />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>

    </>);
}

export default ViewDocument;
