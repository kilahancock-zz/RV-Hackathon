import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Login from './containers/Login.js';
import Home from './components/Home.js';
import Entertainment from './components/Entertainment.js';
import Food from './components/Food.js'
import Workouts from './components/Workouts.js';
import Create from './components/Create.js';
import Signup from './containers/Signup.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


//debug helper
// function getTableColumns() {
//     //useEffect(() => {
//         fetch('http://localhost:3000/meta')
//             .then(response => response.json())
//             .then(data => console.log(data));
//     //}, []);
// }


//Call this function to get data from outlook calendar
function getOutlookData() {
  let endpoint = 'http://localhost:3000/getOutlookData';
  fetch(endpoint).then(response => console.log(response.json()));
}

//debug helper
// function getTableColumns() {
//     //useEffect(() => {
//         fetch('http://localhost:3000/meta')
//             .then(response => response.json())
//             .then(data => console.log(data));
//     //}, []);

function App() {

  //createNewUser("Billy", "Bob", "Billy@gmail.com", "1234");
  getOutlookData();

  return (
    <Router>
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Laugh">
          <Entertainment />
        </Route>
        <Route path="/Eat">
          <Food />
        </Route>
        <Route path="/Stretch">
          <Workouts />
        </Route>
        <Route path="/Create">
          <Create />
        </Route>
        </Switch>

    </div>
    </Router>
  );
}

export default App;
