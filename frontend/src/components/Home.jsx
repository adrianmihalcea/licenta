import { React } from "react";
import { Col, Row, Container, Image, Button } from 'react-bootstrap';
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
        <Row style={{
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
        </Row>
        <Row style={{
            paddingTop: '7%'
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
