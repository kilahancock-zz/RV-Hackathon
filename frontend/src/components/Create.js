import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, FormControl, Button, Container} from 'react-bootstrap';
import Navigation from './Navigation.js';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button_clicked: "stretch",
    };
  }

  render() {

          return(
              <h1>
                Create Something!
              </h1>
          );
  }

}


export default Create;
