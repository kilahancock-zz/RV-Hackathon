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


class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
     };
  }

  handleFirstChange = (event) => {
    this.setState ({
      first_name: event.target.value
    });
  }

  handleLastChange = (event) => {
    this.setState ({
      last_name: event.target.value
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

  handleSubmit = (event) => {
    console.log("here");
  }


  render() {
    return (
      <Container>
      <div className="Signup">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="first_name" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            placeholder= " "
            autoFocus
            type="text"
            onChange={this.handleFirstChange}
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            onChange={this.handleLastChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
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
          <Button
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
