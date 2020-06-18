import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Tab, Tabs} from 'react-bootstrap';
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
              <Container>
                <Tabs defaultActiveKey="videos" id="uncontrolled-tab-example">
                  <Tab eventKey="videos" title="Videos">
                    <h3 className="exHead">Videos from RV's Very Own: Nick Trull</h3>
                    <Row>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/TVFW0hIqDOY" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/n74UV0QNXH0" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/bZZDReTfBFY" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/4ZOgdOEt9hA" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/IdnWH3uDbcE" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/Gnrya2Vh4F8" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/skIo_PIzV2E" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/QM4NZCetNxE" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/EM6MbIY_6SY" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                      <Col>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/1aRo0Ryh1Ac" 
                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen>
                        </iframe>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="exercises" title="Exercises">
                    <div>{this.state.exerciseCards}</div>
                  </Tab>
                </Tabs>
              </Container>
            </div>
          );
  }

}


export default Workouts;
