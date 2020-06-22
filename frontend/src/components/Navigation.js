import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css';
import {Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';
import Entertainment from './Entertainment.js';
import Food from './Food.js'
import Workouts from './Workouts.js';
import Create from './Create.js';
import App from '../App.js';
import Login from '../containers/Login.js';
import Signup from '../containers/Signup.js';
import Home from './Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button_clicked: "stretch",
    };
  }

  handleButtonClicked = (event) => {
    let break_category = {
            ...this.state.button_clicked
    };

    break_category = event.currentTarget.getAttribute("category");


    this.setState({
        button_clicked: break_category
    });
  };



  render() {
      return(
          <Container className= "nav">
              <Navbar className = "nav" sticky="top" bg="light" expand="lg">
                  <Navbar.Brand className = "title"><Link to="/">RedRelax</Link></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="links">
                          <Nav.Link>
                            <Link to="/Laugh">Laugh</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/Eat">Eat</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/Stretch">Stretch</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/Create">Create</Link>
                          </Nav.Link>
                      </Nav>
                      <Form inline>
                          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                          <Button className="search">Search</Button>
                      </Form>

                      <Nav className="login">
                      <Nav.Link>
                        <Link to="/login">Login</Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/signup">SignUp</Link>
                      </Nav.Link>
                      </Nav>

                  </Navbar.Collapse>
              </Navbar>
          </Container>
      );
  }
}

export default Navigation;
