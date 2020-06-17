import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css';
import {Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';

class Navigation extends Component {
    render() {
        return(
            <div>
            <Container className="nav">
                <Navbar id="navbar" sticky="top" bg="light" expand="lg">
                    <Navbar.Brand>RedRelax</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>Laugh</Nav.Link>
                            <Nav.Link>Eat</Nav.Link>
                            <Nav.Link>Stretch</Nav.Link>
                            <Nav.Link>Create</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            </div>
        );
    }
}

export default Navigation;