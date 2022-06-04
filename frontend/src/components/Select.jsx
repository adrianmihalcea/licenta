import { Button, Container, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Select = () =>
{
    const navigate = useNavigate();

    const handleViewButton = () => {
        navigate('/view');
    }
    
    const handleUploadButton = () => {
        navigate('/upload');
    }

    return(<Container fluid style={{
        width: '50%',
        margin: 'auto',
        textAlign: 'center'
    }}>
        <Row style={{
            padding: '10%',
            borderRadius: '10px'
        }}>
            <h1>Select desired action</h1>
        </Row>        
        <Row><Card bg='primary' text='light'><Card.Body>
                <Card.Text style={{
                    fontSize: '20pt'
                }}>
                Access metadata for an already saved document, providing its hash
                </Card.Text>
                <Button onClick={handleViewButton} variant='warning'>View</Button>
        </Card.Body></Card></Row>
        <Row><Card bg='success' text='light'><Card.Body>
            <Card.Text style={{
                fontSize: '20pt'
            }}>
            Upload a new document to the IPFS, and add its metadata to the ETH blockchain
            </Card.Text>
            <Button onClick={handleUploadButton} variant='warning'>Upload</Button>
        </Card.Body></Card></Row>
    </Container>);
}
 
export default Select;
