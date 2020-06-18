import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import axios from 'axios';
import './Food.css';

class Food extends Component {
    state = {
        jokeCards: [],
        factCards: []
    }
    async fetchJokes() {
        let jokes = [];
        let tempCards = [];
        for (let i = 0; i < 25; i++) {
            await axios.get('https://api.spoonacular.com/food/jokes/random?apiKey=d62f9a4cef894a6aa8fc413510e803ea')
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
            await axios.get('https://api.spoonacular.com/food/trivia/random?apiKey=d62f9a4cef894a6aa8fc413510e803ea')
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

    render() {
        return(
            <Container>
            <Tabs defaultActiveKey="recipes" id="uncontrolled-tab-example">
                <Tab eventKey="recipes" title="Recipes">
                    <div>hi</div>
                </Tab>
                <Tab eventKey="jokes" title="Jokes">
                    <h1>Jokes</h1>
                    <div>{this.state.jokeCards}</div>
                </Tab>
                <Tab eventKey="funFacts" title="Fun Facts">
                    <h1>Fun Facts</h1>
                    <div>{this.state.factCards}</div>
                </Tab>
            </Tabs>
            </Container>
        );
    }
}

export default Food;