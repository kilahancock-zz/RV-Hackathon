import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import axios from 'axios';
import './Entertainment.css'

class Entertainment extends Component {
    state = {
        memeCards: [],
        gifCards: []
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
            this.setState({memeCards: tempCards})
        })
    }
    async fetchGifs() {
        let gifs = [];
        let tempCards = [];
        await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=wtsQqjEI3Xs8i3Z0iFTK37yUhSIVkmFv&limit=50')
        .then(res => {
            for (let i = 0; i < 50; i++) {
                gifs.push(res.data.data[i].images.downsized_large.url);
                let temp = <div><img className="gif" alt="gif" src={gifs[i]}/></div>
                tempCards.push(temp);
            }
            this.setState({gifCards: tempCards})
        })
    }

    componentDidMount() {
        this.fetchMemes();
        this.fetchGifs();
    }

    render() {
        return(
            <Container>
            <Tabs className="tab" defaultActiveKey="gifs" id="uncontrolled-tab-example">
                <Tab eventKey="memes" title="Memes">
                    <div>{this.state.memeCards}</div>
                </Tab>
                <Tab eventKey="videos" title="Videos">
                    <h1>Embedded Youtube Videos</h1>
                </Tab>
                <Tab eventKey="gifs" title="GifHub">
                    <div>{this.state.gifCards}</div>
                </Tab>
            </Tabs>
            </Container>
        );
    }
}

export default Entertainment;
