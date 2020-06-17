import React, { Component } from 'react';
import Aux from '../Aux/Aux.js'
import Navigation from "../components/Navigation.js"



class Main extends Component {
    state = {
      button_clicked: "stretch"
    };



    button_clicked_handler = (event) => {

      let break_category = event.currentTarget.getAttribute('category');

      this.setState({
        button_clicked : break_category
      });
    };


    render() {
            return(
                <Aux>
                  <Navigation />
                </Aux>
            );
    }
}



export default Main;
