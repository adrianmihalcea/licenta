import { React } from "react";
import { Col, Row, Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import logoEth from '../resources/logo_eth.png';
import logoIpfs from '../resources/logo_ipfs.png';
import logoUpb from '../resources/logo_upb.jpg';

import styles from '../styles/home.module.css';

const Home =() => {
    const navigate = useNavigate();

    const handleGoButton = (event) => {
        navigate('/select');
    }

    return (<Container fluid style={{
        width: '70%',
        margin: 'auto',
        textAlign: 'center'
    }}>

        <Row className={styles.titleCard}><Card bg='primary' text='light' style={{
            height: '25vh'
        }}><Card.Body>
            <Card.Title style={{
                fontSize: '42pt'
            }}>Document validation over ETH and IPFS</Card.Title>
            <Button onClick={handleGoButton} variant='warning' style={{
                fontSize: '35pt',
                marginTop: '25px'
            }}>Start</Button>
        </Card.Body></Card></Row>

        <Row className={styles.footerBox}>
            <Col>
                <Card bg='primary' text='light'>
                    <Card.Title>Ethereum</Card.Title>
                    <Card.Img src={logoEth} className={styles.tallFooterImage}/>
                </Card>
            </Col>
            <Col>
                <Card bg='primary' text='light'>
                    <Card.Title>InterPlanetary File System</Card.Title>
                    <Card.Img src={logoIpfs} className={styles.footerImage}/>
                </Card>
            </Col>
            <Col>
                <Card bg='primary' text='light'>
                    <Card.Title>UPB</Card.Title>
                    <Card.Img src={logoUpb} className={styles.footerImage}/>
                </Card>
            </Col>
        </Row>
    </Container>);
}

export default Home;
