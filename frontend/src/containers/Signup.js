import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Container
} from "react-bootstrap";
import "./Signup.css";
import App from "../App.js";




class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "",
      last: "",
      email: "",
      password: "",
     };
  }

  handleFirstChange = (event) => {
    this.setState ({
      first: event.target.value
    });
  }

  handleLastChange = (event) => {
    this.setState ({
      last: event.target.value
    });
  }

  handleUserChange = (event) => {
    this.setState ({
      email: event.target.value
    });
  }

  handlePassChange = (event) => {
    this.setState ({
      password: event.target.value
    });
  }


  render() {
    return (
      <Container>
      <div className="Signup">
      <form>
        <FormGroup controlId="first_name" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            onChange={this.handleFirstChange}
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            type="text"
            onChange={this.handleLastChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            onChange={this.handleUserChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            onChange={this.handlePassChange}
          />
          </FormGroup>
          <Button onClick={() =>
            this.props.update(this.state.first, this.state.last, this.state.email, this.state.password)}
          block
          variant="flat"
          bsSize="large">Submit
        </Button>
      </form>
      </div>
      </Container>
    );
  }
}

export default Signup;
