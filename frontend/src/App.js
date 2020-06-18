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

//creates a new user in the system.
async function createNewUser(firstName, lastName, emailAddress, password) {
    let success = false;
    if (firstName.includes("+")) {
        throw ("First name cannot include '+'.");
    } else if (lastName.includes("+")) {
        throw ("Last name cannot include '+'.");
    } else if (emailAddress.includes("+")) {
        throw ("Email address cannot include '+'.");
    } else if (password.includes("+")) {
        throw ("Password cannot include '+'.");
    } else {
        let queryStr = 'http://localhost:3000/newUser/' + firstName + "+" + lastName + "+" + emailAddress + "+" + password;
        await fetch(queryStr)
            .then(response => {
                console.log("successfully created account for: " + firstName + " " + lastName +
                " with email: " + emailAddress + " and password: " + password);
                success = true;
            });
    }
    return success;
}

//checks to see if a user is already in the system / exists.
async function alreadyExistUser(emailAddress) {
    let exists = false;
    if (emailAddress.includes("+")) {
        throw ("Email address cannot include '+'.");
    } else {
        let queryStr = 'http://localhost:3000/existUser/' + emailAddress;
        await fetch(queryStr)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                exists = data.length > 0;
                if (exists) {
                    console.log("a user with " + emailAddress + " already exists.");
                } else {
                    console.log("a user with " + emailAddress + " does NOT already exist.");
                }
            });
    }
    return exists;
}

//Attempts a user login. Do this only after knowing a User already exists.
async function loginUser(emailAddress, password) {
    let human = null;
    if (emailAddress.includes("+")) {
        throw ("Email address cannot include '+'.");
    } else if (password.includes("+")) {
        throw ("Password cannot include '+'.");
    } else {
        let queryStr = 'http://localhost:3000/loginUser/' + emailAddress + "+" + password;
        await fetch(queryStr)
            .then(response => response.json())
            .then(data => data[0])
            .then(person => {
                console.log("successfully logged in " + emailAddress);
                human = person;
            });
    }
    return human;
}

//Call this function to get data from outlook calendar
function getOutlookData() {
  let endpoint = 'http://localhost:3000/getOutlookData';
  fetch(endpoint).then(response => console.log(response.json()));
}

function App() {

    //test to see if Billy already exists as a user.
    alreadyExistUser("Billy@gmail.com").then(exists => {
        //if not, create an account for him.
       if (!exists) {
           createNewUser("Billy", "Bob", "Billy@gmail.com", "12345").then((success) => {
               //if account creation successful, go ahead and log him in.
               if (success) {
                   loginUser("Billy@gmail.com", "12345").then(results => {
                       console.log(results);
                   });
               }
           });
       //if so, log him in and print his info.
       } else {
           loginUser("Billy@gmail.com", "12345").then(results => {
               console.log(results);
           });
       }
    });




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
