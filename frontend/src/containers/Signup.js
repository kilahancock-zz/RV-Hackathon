import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  FormLabel,
  Button
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
      username: event.target.value
    });
  }

  handlePassChange = (event) => {
    this.setState ({
      password: event.target.value
    });
  }

  handleSubmit = (event) => {
    this.createNewUser(this.state.first_name, this.state.last_name,
      this.state.username, this.state.password);
  }

  //call this function whenever we desire a new user in the system.
  //and the user has provided the appropriate credentials.
  createNewUser(firstName, lastName, emailAddress, password) {
      if (firstName.includes("+")) {
          console.log("First name cannot include '+'.");
      } else if (lastName.includes("+")) {
          console.log("Last name cannot include '+'.");
      } else if (emailAddress.includes("+")) {
          console.log("Email address cannot include '+'.");
      } else if (password.includes("+")) {
          console.log("Password cannot include '+'.");
      } else {
          console.log("here");
          let queryStr = 'http://localhost:3000/newUser/' + firstName + "+" + lastName + "+" + emailAddress + "+" + password;
          fetch(queryStr).then(response => console.log(response));
      }
  }


  render() {
    return (
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
          type="submit"
          bsSize="large">Submit
        </Button>
      </form>
      </div>
    );
  }
}

export default Signup;
