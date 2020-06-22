import React, { Component, useEffect } from 'react';
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



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      userData : {
        ent_data: 0,
        snack_data: 0,
        workout_data: 0,
        creative_data: 0
      },

      user_logged_in: false,

      userInfo : {
        first: "",
        last: "",
        email: "",
        password: ""
      }
    };
  }



    // @description: Creates a new user in the system.
    // @param String firstName: first name of the new user.
    // @param String lastName: last name of the new user.
    // @param String emailAddress: the chosen email for the new user.
    // @param String password: the chosen password for the new user.
    // @returns boolean success: whether or not user-creation was successful.
        static async createNewUser(firstName, lastName, emailAddress, password) {
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

    //@description: Checks to see if a user already exists. Call this function before deciding an attempt at login.
    //@param String emailAddress: self-explanatory.
    //@returns boolean exists: whether or not the email address was found in the database.
        static async alreadyExistUser(emailAddress) {
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

    //@description: Attempts a user login. Only call after knowing a user already exists.
    //@param String emailAddress: self-explanatory.
    //@param String password: self-explanatory.
    //@returns JSON: person object if login successful.
        static async loginUser(emailAddress, password) {
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

    //@description: call this function as you load in "content" so we can keep track of content loaded per-user.
    //@param int userId: unique per user (returned in JSON when logged user in).
    //@param int section: 0=creative, 1=food, 2=entertainment, 3=workout.
    //@param int additional: by how much do you wish to increase the chosen counter in the DB.
    //@returns null
        async updateUserStats(userId, section, additional) {
            let queryStr = 'http://localhost:3000/updateUser/' + userId + "+" + section + "+" + additional;
            await fetch(queryStr)
                .then(data => {});
        }


    updateUserState = (_first, _last, _email, _password) => {
      let updatedState = {
        ...this.state.userInfo
      }
      updatedState.first = _first;
      updatedState.last = _last;
      updatedState.email = _email;
      updatedState.password = _password;

      console.log(updatedState);
      this.setState ({
        userInfo: updatedState,
        user_logged_in: true
      }, () => console.log(this.state));
    };

    updateLoginState = (_email, _password) => {
      let updatedState = {
        ...this.state.userInfo
      }
      //need a database call in here to fetch first and last name
      updatedState.email = _email;
      updatedState.password = _password;

      console.log(updatedState);
      // this.setState ({
      //   userInfo: updatedState,
      //   user_logged_in: true
      // }, () => console.log(this.state));
    };

    entClicked = () => {
      let updatedState = {
        ...this.state.userData
      }
      let currTally = updatedState.ent_data;
      updatedState.ent_data += currTally;

      this.setState ({
        userData: updatedState
      }, () => console.log(this.state));
    };



render () {
  return (
    <Router>
    <div className="App">
      <Navigation  />
      <Switch>
        <Route exact path="/">
          <Home user_logged_in={this.state.user_logged_in} ent_data= {this.state.ent_data}
          snack_data= {this.state.snack_data}/>
        </Route>
        <Route path="/signup">
          <Signup update={this.updateUserState}/>
        </Route>
        <Route path="/login">
          <Login updateLogin= {this.updateLoginState}/>
        </Route>
        <Route path="/Laugh">
          <Entertainment entClicked= {this.entClicked}/>
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
}

export default App;
