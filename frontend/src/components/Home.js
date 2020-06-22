import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

    render() {
          if (this.props.user_logged_in) {
            return(
            <Container>
              <h1 className="welcome">Your Break Stats! </h1>
              <Row>
                <Col>Memes viewed: {this.props.ent_data}</Col>
                <Col className="left">Snacks made: {this.props.snack_data}</Col>
              </Row>
              <Row>
                <Col>Workouts completed: {this.props.workout_data}</Col>
                <Col className="left">Creative moments: {this.props.create_data}</Col>
              </Row>
            </Container>
            );
          } else {
            return(
              <Container className="welcome">
              <h1 className="welcome">Welcome to RedRelax.</h1>

              <h3 className="burb">The break activity hub of your dreams.</h3>
            
              </Container>
              );
          }
    }
}

export default Home;
