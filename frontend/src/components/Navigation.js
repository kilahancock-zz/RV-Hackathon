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
  }

  render() {
      let str = ""
      if (this.props.name !== "") {
        str = "Hi, " + this.props.name + "!"
      }
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
                      <Nav className="login">
                      <h6 id="hi">{str}</h6>
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
