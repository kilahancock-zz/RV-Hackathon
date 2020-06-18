import React, { Component } from 'react';
import Aux from '../Aux/Aux.js'
import Navigation from "../components/Navigation.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class Eat extends Component {
    state = {

    };






    render() {

            return(
                <Aux>
                  <Navigation />
                  <h1>"Eat"</h1>
                </Aux>
            );
    }
}



export default Eat;
