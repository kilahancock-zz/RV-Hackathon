import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
    state = {
        user_logged_in: true,
        entertainment_data: 10,
        snack_data: 4,
        workout_data: 5,
        creative_data: 2,
    }

    render() {

          if (this.state.user_logged_in) {
            return(
            <Container>
              <h1>Your Break Stats!</h1>
              <Row>
                <Col>Memes viewed: {this.state.entertainment_data}</Col>
                <Col className="left">Snacks made: {this.state.snack_data}</Col>
              </Row>
              <Row>
                <Col>Workouts completed: {this.state.workout_data}</Col>
                <Col className="left">Creative moments: {this.state.creative_data}</Col>
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
