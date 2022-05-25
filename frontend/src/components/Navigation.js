import { Navbar, Nav, Container } from 'react-bootstrap';
import React from "react";

const Navigation = () =>
{
    return (<>

    < Navbar bg="primary" expand="lg" >
        <Container>
            <Navbar.Brand href="">Licenta</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/select">Select</Nav.Link>
                    <Nav.Link href="/view">View</Nav.Link>
                    <Nav.Link href="/upload">Upload</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar >

    </>);
};

export default Navigation;