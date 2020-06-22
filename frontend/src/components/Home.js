import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      console.log(this.props.ent_data);
          if (this.props.user_logged_in) {
            return(
            <Container>
              <h1>Your Break Stats! </h1>
              <Row>
                <Col>Memes viewed: {this.props.ent_data}</Col>
                <Col className="left">Snacks made: {this.props.snack_data}</Col>
              </Row>
              <Row>
                <Col>Workouts completed: </Col>
                <Col className="left">Creative moments: </Col>
              </Row>
            </Container>
            );
          } else {
            return(
              <Container className="welcome">
              <h1>Welcome to RedRelax.</h1>
              </Container>
              );
          }
    }
}

export default Home;
