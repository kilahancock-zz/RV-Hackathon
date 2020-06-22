import React, { Component } from 'react';
import {Tabs, Tab, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import './Food.css';
import HtmlComponent from './HtmlComponent.js';

class Food extends Component {
    state = {
        jokeCards: [],
        factCards: [],
        recipeCards: []
    }
    async fetchJokes() {
        let jokes = [];
        let tempCards = [];
        for (let i = 0; i < 3; i++) {
            fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random", {
	            "method": "GET",
	            "headers": {
		            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		            "x-rapidapi-key": "30dec66674msh6e61f03066844bap1587dejsnd52025e3e1f9"
                }
            })
            .then(response => {
	            return response.json();
            })
            .then (res => {
                console.log(res);
                jokes.push(res.text);
                let temp = <div className="jokeCard"><h3>{res.text}</h3></div>
                tempCards.push(temp);
            })
            .catch(err => {
	            console.log(err);
            });
        }
        this.setState({jokeCards: tempCards})
    }
    async fetchFacts() {
        let facts = [];
        let tempCards = [];
        for (let i = 0; i < 3; i++) {
            fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random", {
	            "method": "GET",
	            "headers": {
		            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		            "x-rapidapi-key": "30dec66674msh6e61f03066844bap1587dejsnd52025e3e1f9"
                }
            })
            .then(response => {
	            return response.json();
            })
            .then (res => {
                console.log(res);
                facts.push(res.text);
                let temp = <div className="factCard"><h3>{res.text}</h3></div>
                tempCards.push(temp);
            })
            .catch(err => {
	            console.log(err);
            });
        }
        this.setState({factCards: tempCards})
    }

    async getRecipes() {
        let titles = []
        let ids = []
        let images = []
        let descriptions = []
        let cards = []
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=2&tags=quick", {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		        "x-rapidapi-key": "30dec66674msh6e61f03066844bap1587dejsnd52025e3e1f9"
	        }
        })
        .then(response => {
	        return response.json()
        })
        .then(response => {
            for (let i = 0; i < 2; i++) {
                titles.push(response.recipes[i].title)
                images.push(response.recipes[i].image)
                ids.push(response.recipes[i].id)
                fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + ids[i] +"/summary", {
	                "method": "GET",
	                "headers": {
		                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		                "x-rapidapi-key": "30dec66674msh6e61f03066844bap1587dejsnd52025e3e1f9"
	                }
                })
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    descriptions.push(response.summary);
                    let temp = <div className="recipe">
                                <h3 className="recipeTitle">{titles[i]}</h3>
                                <Row>
                                    <Col>
                                        <img src={images[i]} alt="img"/>
                                    </Col>
                                    <Col>
                                        <HtmlComponent body={descriptions[i]}/>
                                    </Col>
                                </Row></div>
                    cards.push(temp);
                    if (i == 1) {
                        this.setState({recipeCards: cards})
                    }
                })
            }
            console.log(descriptions)
        })
        .catch(err => {
	        console.log(err);
        });
    }

    componentDidMount() {
        this.fetchJokes()
        this.fetchFacts()
        this.getRecipes()
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
                    <div>{this.state.recipeCards}</div>
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
