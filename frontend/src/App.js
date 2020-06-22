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
import Calendar from './components/Calendar.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      userData : {
        ent_data: 10,
        snack_data: 5,
        workout_data: 3,
        create_data: 1
      },

      user_logged_in: true,

      userInfo : {
        first: "",
        last: "",
        email: "",
        password: ""
      },

      redirect_to_home: "/"
    };
  }



    // @description: Creates a new user in the system.
    // @param String firstName: first name of the new user.
    // @param String lastName: last name of the new user.
    // @param String emailAddress: the chosen email for the new user.
    // @param String password: the chosen password for the new user.
    // @returns boolean success: whether or not user-creation was successful.
        async createNewUser(firstName, lastName, emailAddress, password) {
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
        async alreadyExistUser(emailAddress) {
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
        async loginUser(emailAddress, password) {
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

      this.setState ({
        userInfo: updatedState,
        user_logged_in: true
      }, () => this.nextStepsSignup(this.state.userInfo));
    };

    updateLoginState = (_email, _password) => {
      let updatedState = {
        ...this.state.userInfo
      }
      //need a database call in here to fetch first and last name
      updatedState.email = _email;
      updatedState.password = _password;

      this.setState ({
        userInfo: updatedState,
        user_logged_in: true
      }, () => this.nextStepsLogin(this.state.userInfo));
    };

    //handler for when some entertainment content is clicked on.
    entClicked = () => {
        this.userData.setState({ent_data: this.state.userData.ent_data + 1});
        this.updateUserStats(this.state.userInfo.id, 2, 1).then(() => console.log("updated creative counter by 1!"));
    };

    //handler for when some food content is clicked on.
    foodClicked = () => {
        this.userData.setState({snack_data: this.state.userData.snack_data + 1});
        this.updateUserStats(this.state.userInfo.id, 1, 1).then(() => console.log("updated food counter by 1!"));
    };

    //handler for when some workout content is clicked on.
    workClicked = () => {
        this.userData.setState({work_data: this.state.userData.work_data + 1});
        this.updateUserStats(this.state.userInfo.id, 3, 1).then(() => console.log("updated workout counter by 1!"));
    };

    //handler for when some creative content is clicked on.
    createClicked = () => {
        this.userData.setState({create_data: this.state.userData.create_data + 1});
        this.updateUserStats(this.state.userInfo.id, 0, 1).then(() => console.log("updated creative counter by 1!"));
    };

    nextStepsSignup(state) {
      console.log(state);
        this.alreadyExistUser(state.email).then(
          (exists) => {
            if (!exists) {
              this.createNewUser(state.first, state.last, state.email, state.password).then(
                (success) => {
                  if (success) {
                    this.loginUser(state.email, state.password).then(
                      () => {
                        return <Redirect to={"/"} />
                      }
                    );
                  } else {
                    console.log("Signup failed");
                  }
                }
              );
            }
          }
        );
    }

    nextStepsLogin(state) {
      console.log(state);
      if (this.alreadyExistUser(state.email)) {
        let human = this.loginUser(state.email, state.password).then(
          () => {
            console.log(human);
          }
        );
        return <Redirect to="/" />
      } else {
        console.log("Email doesn't exists");
      }

    }



render () {
  return (
    <Router>
    <div className="App">
      <Navigation name={this.state.userInfo.first}/>
      <div className="sideBySide">
      <Calendar userEmail={this.state.userInfo.email}/>
      <Switch>
        <Route exact path="/">
          <Home user_logged_in={this.state.user_logged_in} ent_data= {this.state.userData.ent_data}
          snack_data={this.state.userData.snack_data} workout_data={this.state.userData.workout_data}
          create_data={this.state.userData.create_data}/>
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
          <Food foodClicked= {this.foodClicked}/>
        </Route>
        <Route path="/Stretch">
          <Workouts workClicked= {this.workClicked}/>
        </Route>
        <Route path="/Create">
          <Create createClicked= {this.createClicked}/>
        </Route>
        </Switch>
    </div>
    </div>
    </Router>
  );
}
}

export default App;
