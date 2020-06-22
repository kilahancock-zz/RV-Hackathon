import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import axios from 'axios';
import './Food.css';

class Food extends Component {
    state = {
        jokeCards: [],
        factCards: [],
        tally: 0
    }
    async fetchJokes() {
        let jokes = [];
        let tempCards = [];
        for (let i = 0; i < 25; i++) {
            await axios.get('https://api.spoonacular.com/food/jokes/random?apiKey=c9aeef669de34d9eb4e0016f7beb018b')
            .then(res => {
                jokes.push(res.data.text);
                let temp = <div className="jokeCard"><h3>{res.data.text}</h3></div>
                tempCards.push(temp);
            })
        }
        this.setState({jokeCards: tempCards})
    }
    async fetchFacts() {
        let facts = [];
        let tempCards = [];
        for (let i = 0; i < 25; i++) {
            await axios.get('https://api.spoonacular.com/food/trivia/random?apiKey=c9aeef669de34d9eb4e0016f7beb018b')
            .then(res => {
                facts.push(res.data.text);
                let temp = <div className="factCard"><h3>{res.data.text}</h3></div>
                tempCards.push(temp);
            })
        }
        this.setState({factCards: tempCards})
    }

    componentDidMount() {
        this.fetchJokes()
        this.fetchFacts()
    }

    tabClicked() {
      let currTally = this.state.tally;
      console.log(currTally);
      let newTally = currTally + 1;

      this.setState({
          tally: newTally
      });
    }


    render() {
        return(
            <Container>
            <Tabs onClick={this.tabClicked} className="eat" defaultActiveKey="recipes" id="uncontrolled-tab-example">
                <Tab eventKey="recipes" title="Recipes">
                    <div>hi</div>
                </Tab>
                <Tab onClick={this.tabClicked} eventKey="jokes" title="Jokes">
                    <h1>Jokes</h1>
                    <div>{this.state.jokeCards}</div>
                </Tab>
                <Tab onClick={this.tabClicked} eventKey="funFacts" title="Fun Facts">
                    <h1>Fun Facts</h1>
                    <div>{this.state.factCards}</div>
                </Tab>
            </Tabs>
            </Container>
        );
    }
}

export default Food;
