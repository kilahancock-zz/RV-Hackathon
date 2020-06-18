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

  handleFieldChange = (event) => {
    console.log("handleFieldChange");
  }

  handleSubmit = (event) => {
    console.log("handleSubmit");
  }



  render() {
    return (
      <div className="Signup">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="first_name" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="first_name"
            value={this.state.first_name}
            onChange={this.handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            autoFocus
            type="last_name"
            value={this.state.last_name}
            onChange={this.handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleFieldChange}
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
