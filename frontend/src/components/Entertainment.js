import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import axios from 'axios';
import './Entertainment.css'
import HtmlComponent from './HtmlComponent';

class Entertainment extends Component {
    state = {
        memeCards: [],
        gifCards: [],
        videoCards: [],
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

    //@description: Call this function to get videos from Vimeo.
    //@param int pageNum: which page number to query from.
    //@param int perPage: how large a page is, this will be how many videos are returned.
    //@param String searchStr: keywords to help Vimeo find suitable videos.
    //@returns array[iframes] frameArray: array of embed-able iframes for matched videos.
    async getVideos(pageNum, perPage, searchStr) {
        let endpoint = 'http://localhost:3000/getVideos';
        let params = "/" + pageNum + "+" + perPage + "+" + searchStr;
        let frameArray = [];
        await fetch(endpoint + params)
            .then(response => response.json())
            .then(json => json.data)
            .then(data => {
                let i;
                for (i = 0; i < data.length; i++) {
                    frameArray.push(data[i].embed.html);
                }
                console.log(frameArray)
                this.setState({videoCards: frameArray});
                console.log(this.state.videoCards);
            });
    }

    componentDidMount() {
        this.fetchMemes();
        this.fetchGifs();
        this.getVideos(1, 3, "funny");
    }



    render() {
        return(
            <Container>
<<<<<<< HEAD
            <Tabs className="tab" defaultActiveKey="memes" id="uncontrolled-tab-example">
                <Tab eventKey="memes" title="Memes">
                    <div>{this.state.memeCards}</div>
                </Tab>
                <Tab eventKey="videos" title="Videos">
                    {this.state.videoCards.map((object, i) => <HtmlComponent body={object} key={i} />)}
=======
            <Tabs onClick={this.props.entTabClicked} className="tab" defaultActiveKey="gifs" id="uncontrolled-tab-example">
                <Tab eventKey="memes" title="Memes">
                    <div>{this.state.memeCards}</div>
                </Tab>
                <Tab onClick={this.props.entTabClicked} eventKey="videos" title="Videos">
                    <h1>Embedded Youtube Videos</h1>
>>>>>>> fe1ed55dadbd1f74914e4029496417e39b4feea5
                </Tab>
                <Tab onClick={this.props.entTabClicked} eventKey="gifs" title="GifHub">
                    <div>{this.state.gifCards}</div>
                </Tab>
            </Tabs>
            </Container>
        );
    }
}

export default Entertainment;
