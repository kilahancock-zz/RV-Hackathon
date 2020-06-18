import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css';
import {Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';
import Entertainment from './Entertainment.js';
import SnackIdeas from './SnackIdeas.js';
import Workouts from './Workouts.js';
import Create from './Create.js';
import App from '../App.js';
import Main from '../containers/Main.js';
import Login from '../containers/Login.js';
import Signup from '../containers/Signup.js';
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
          <Router>
          <Container className="nav">
              <Navbar id="navbar" sticky="top" bg="light" expand="lg">
                  <Navbar.Brand><Link to="/">RedRelax</Link></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <Nav.Link>
                            <Link to="/Laugh" category={"laugh"}>Laugh</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/Eat" category={"eat"}>Eat</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/Stretch" category={"stretch"}>Stretch</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/Create" category={"create"}>Create</Link>
                          </Nav.Link>
                          <Nav pullRight>
                          <Nav.Link>
                            <Link to="/login">Login</Link>
                          </Nav.Link>
                          <Nav.Link>
                            <Link to="/signup">SignUp</Link>
                          </Nav.Link>
                          </Nav>

                      </Nav>
                      <Form inline>
                          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                          <Button>Search</Button>
                      </Form>
                  </Navbar.Collapse>
              </Navbar>
          </Container>
          <Switch>
            <Route path="/signup">
              <Signup />
              </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/Laugh">
              <Entertainment />
            </Route>
            <Route path="/Eat">
              <SnackIdeas />
            </Route>
            <Route path="/Stretch">
              <Workouts />
            </Route>
            <Route path="/Create">
              <Create />
            </Route>
            </Switch>
          </Router>
      );
  }
}

export default Navigation;
