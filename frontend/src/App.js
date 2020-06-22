import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Calendar from './components/Calendar.js';
import Login from './containers/Login.js';
import Home from './components/Home.js';
import Entertainment from './components/Entertainment.js';
import Food from './components/Food.js'
import Workouts from './components/Workouts.js';
import Create from './components/Create.js';
import Signup from './containers/Signup.js';
import User from './User.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

//Call this function to get data from outlook calendar.
function getOutlookData() {
  let endpoint = 'http://localhost:3000/getOutlookData';
  fetch(endpoint).then(response => {
    let returnValue = response.json();
    console.log(returnValue);
  });
}

function App() {

  //getVideos(1, 5, "funny").then((response) => console.log(response));

  /*
    //EXAMPLE OF USER-RELATED BACKEND CALLS----------------------------------
    alreadyExistUser("Billy@gmail.com").then(exists => {
        //if Billy doesn't already exist, create an account for him.
       if (!exists) {
           createNewUser("Billy", "Bob", "Billy@gmail.com", "12345").then((success) => {
               //if account creation successful, go ahead and log him in.
               if (success) {
                   loginUser("Billy@gmail.com", "12345").then(results => {
                       //print his returned JSON data.
                       console.log(results);
                   });
               }
           });
       //if Billy does exist, go ahead and log him in.
       } else {
           loginUser("Billy@gmail.com", "12345").then(results => {
               //print his returned JSON data.
               console.log(results);
               //also update his food counter by 15.
               updateUserStats(1, 1, 15).then(() => console.log("food increased by 15"));
           });
       }
    });
    //-------------------------------------------------------------------------
*/
    getOutlookData();

  return (
    <Router>
    <div className="App">
      <Navigation />
      <div className="sideBySide">
        <Calendar />
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
    </div>
    </Router>
  );
}

export default App;
