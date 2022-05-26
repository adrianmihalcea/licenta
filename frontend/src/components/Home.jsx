import { React } from "react";
import { Col, Row, Container, Image } from 'react-bootstrap';

import logoEth from '../resources/logo_eth.png';
import logoIpfs from '../resources/logo_ipfs.png';
import logoUpb from '../resources/logo_upb.jpg';

const Home =() => {
    return (
        <Container>
            <Row><Col xs={6} md={4}>
                <h1>Validarea documentelor folosind Blockchain</h1>
            </Col></Row>
            <Row>
                <Col><Image src={logoEth} style={{
                    height: '25vh',
                    width: '10vw'
                }}/></Col>
                <Col><Image src={logoIpfs} style={{
                    height: '18vh',
                    width: '10vw'
                }}/></Col>
                <Col><Image src={logoUpb} style={{
                    height: '18vh',
                    width: '10vw'
                }}/></Col>
            </Row>
        </Container>
    );
}

export default Home;
