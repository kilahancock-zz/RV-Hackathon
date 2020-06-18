import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import axios from 'axios';
import './Entertainment.css'

class Entertainment extends Component {
    state = {
        cards: []
    }
    async fetchMemes() {
        let titles = [];
        let authors = [];
        let images = [];
        let tempCards = [];
        await axios.get('https://www.reddit.com/r/memes/new.json?limit=50')
        .then(res => {
            for (let i = 0; i < 50; i++) {
                titles.push(res.data.data.children[i].data.title);
                authors.push(res.data.data.children[i].data.author);
                images.push(res.data.data.children[i].data.url);
            }

            for (let i = 0; i < 50; i++) {
                let inner = <div className="memeCard">
                    <h4 className="memeTitle">{titles[i]}</h4>
                    <h5 className="memeAuthor">{authors[i]}</h5>
                    <img className="memeImg" src={images[i]} alt="meme"/></div>;
                tempCards.push(inner);
            }
            this.setState({cards: tempCards})
        })
    }

    render() {
        this.fetchMemes();
        return(
            <div>
            <h1>Entertainment</h1>
            <Container>
            <Tabs defaultActiveKey="memes" id="uncontrolled-tab-example">
                <Tab eventKey="memes" title="Memes">
                    <div>{this.state.cards}</div>
                </Tab>
                <Tab eventKey="videos" title="Videos">
                    <h1>Embedded Youtube Videos</h1>
                </Tab>
                <Tab eventKey="riddles" title="Riddles">
                    <h1>Riddles??</h1>
                </Tab>
            </Tabs>
            </Container>
            </div>
        );
    }
}

export default Entertainment;
