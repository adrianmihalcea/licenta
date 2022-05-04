import { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import React from "react";

export default class Navigation extends Component {
    render() {
        return (
            <>
                < Navbar bg="primary" expand="lg" >
                    <Container>
                        <Navbar.Brand href="">Bonds</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                {/* <Nav.Link href="/ShowAll">ShowAll</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar >
            </>
        );
    }
};