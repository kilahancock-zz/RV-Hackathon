import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import axios from 'axios';

class Entertainment extends Component {
    cards = []
    async fetchMemes() {
        let titles = [];
        let authors = [];
        let images = [];
        await axios.get('https://www.reddit.com/r/memes/new.json?limit=50')
        .then(res => {
            for (let i = 0; i < 5; i++) {
                titles.push(res.data.data.children[i].data.title);
                authors.push(res.data.data.children[i].data.author_fullname);
                images.push(res.data.data.children[i].data.url);
            }
            this.createMemeCards(titles, authors, images);
        })
    }
    createMemeCards(titles, authors, images) {
        let cards = []
        for (let i = 0; i < 50; i++) {
            let inner = 
            (<div>
                <h1>{titles[i]}</h1>
            </div>);
            cards.push(inner);
        }
        this.cards = cards;
    }
    render() {
        this.fetchMemes()
        return(
            <div>
            <h1>Entertainment</h1>
            <Container>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Memes">
                    <h1>Meme Thread</h1>
                    <div>{this.cards[0]}</div>
                </Tab>
                <Tab eventKey="profile" title="Videos">
                    <h1>Embedded Youtube Videos</h1>
                </Tab>
                <Tab eventKey="contact" title="Riddles">
                    <h1>Riddles??</h1>
                </Tab>
            </Tabs>
            </Container>
            </div>
        );
    }
}

export default Entertainment;