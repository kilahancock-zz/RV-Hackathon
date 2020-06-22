import React, {Component} from "react";
import { Button, FormGroup, FormControl, FormLabel, Container} from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  setEmail = (event) => {
    this.setState ({
      email: event.target.value
    });
  }

  setEmail = (event) => {
    this.setState ({
      email: event.target.value
    });
  }

render() {
  return (
    <Container>
    <div className="Login">
      <form>
        <FormGroup controlId="email" bsSize="large">
        <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="text"
            onChange={this.setEmail}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="text"
            onChange={this.setPassword}
          />
        </FormGroup>
        <Button onClick={this.props.updateLogin(this.state.email, this.state.password)} variant="flat" block bsSize="large" disabled={!this.validateForm}>
          Login
        </Button>
      </form>
    </div>
    </Container>
  );
}
}

export default Login;
