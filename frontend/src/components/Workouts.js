import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import './Workouts.css'

class Workouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button_clicked: "stretch",
      exerciseCards: []
    };
  }

  async fetchExercises() {
    let cards = [];
    let images = [];
    await axios.get('https://wger.de/api/v2/exerciseimage/?is_main=True&limit=100')
    .then(res => {
        for (let i = 0; i < 100; i++) {
          console.log(res.data.results[i].image);
          images.push(res.data.results[i].image);
          //let temp = <div><img className="exercises" alt="exercise" src={images[i]}/></div>
          //cards.push(temp);
        }
        let count = 0;
        for (let i = 0; i < 25; i++) {
          let temp = [];
          for (let j = 0; j < 4; j++) {
            temp.push(<Col><img className="exercises" alt="exercise" src={images[count]}/></Col>)
            count++;
          }
          let full = <Row className="exRow" >{temp}</Row>
          cards.push(full);
        }
        this.setState({exerciseCards: cards})
    })
  }

  componentDidMount() {
    this.fetchExercises();
  }

  render() {

          return(
            <div>
              <h1>
                Exercises!
              </h1>
              <div>{this.state.exerciseCards}</div>
            </div>
          );
  }

}


export default Workouts;
