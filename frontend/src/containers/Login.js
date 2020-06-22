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

  setEmail = (event) => {
    this.setState ({
      email: event.target.value
    });
  }

  setPassword = (event) => {
    this.setState ({
      password: event.target.value
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
        <Button onClick={() => this.props.updateLogin(this.state.email, this.state.password)} variant="flat" block bsSize="large">
          Login
        </Button>
      </form>
    </div>
    </Container>
  );
}
}

export default Login;
