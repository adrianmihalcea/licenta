import { React } from "react";
import { Col, Row, Container, Image, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logoEth from '../resources/logo_eth.png';
import logoIpfs from '../resources/logo_ipfs.png';
import logoUpb from '../resources/logo_upb.jpg';

const Home =() => {
    const navigate = useNavigate();

    const handleGoButton = (event) => {
        navigate('/select');
    }

    return (<Container fluid style={{
        width: '60%',
        margin: 'auto',
        textAlign: 'center'
    }}>
        {/* <Row style={{
            padding: '18%',
            backgroundColor: '#10c4c9',
            borderRadius: '10px'
        }}>
            <Col>
            <h1>Validarea documentelor peste Ethereum si IPFS</h1>
            </Col>
            
        </Row>
        <Row>
            <Col><Button onClick={handleGoButton} size="lg" variant="secondary" style={{
                padding: '2%'
            }}>Let's start</Button></Col>
        </Row> */}

        <Row style={{
            paddingTop: '5%',
            paddingBottom: '20%'
        }}><Card bg='info' text='dark' style={{
            height: '25vh'
        }}><Card.Body>
            <Card.Title style={{
                fontSize: '42pt'
            }}>Document validation over ETH and IPFS</Card.Title>
            <Button onClick={handleGoButton} variant='secondary' style={{
                fontSize: '35pt'
            }}>Start</Button>
        </Card.Body></Card></Row>

        <Row style={{
            padding: '4%',
            borderStyle: 'dotted'
        }}>
            <Col><Image src={logoEth} className='img-fluid' style={{
                width: '35%'
            }}/></Col>
            <Col><Image src={logoIpfs} className='img-fluid' style={{
                width: '50%'
            }}/></Col>
            <Col><Image src={logoUpb} className='img-fluid' style={{
                width: '50%'
            }}/></Col>
        </Row>
    </Container>);
}

export default Home;
