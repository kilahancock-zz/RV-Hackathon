import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Main from './containers/Main.js';
import Login from './containers/Login.js';

//@description: Creates a new user in the system.
//@param String firstName: first name of the new user.
//@param String lastName: last name of the new user.
//@param String emailAddress: the chosen email for the new user.
//@param String password: the chosen password for the new user.
//@returns boolean success: whether or not user-creation was successful.
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

//@description: Checks to see if a user already exists. Call this function before deciding an attempt at login.
//@param String emailAddress: self-explanatory.
//@returns boolean exists: whether or not the email address was found in the database.
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

//@description: Attempts a user login. Only call after knowing a user already exists.
//@param String emailAddress: self-explanatory.
//@param String password: self-explanatory.
//@returns JSON: person object if login successful.
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

//@description: call this function as you load in "content" so we can keep track of content loaded per-user.
//@param int userId: unique per user (returned in JSON when logged user in).
//@param int section: 0=creative, 1=food, 2=entertainment, 3=workout.
//@param int additional: by how much do you wish to increase the chosen counter in the DB.
//@returns null
async function updateUserStats(userId, section, additional) {
    let queryStr = 'http://localhost:3000/updateUser/' + userId + "+" + section + "+" + additional;
    await fetch(queryStr)
        .then(data => {});
}


//Call this function to get data from outlook calendar
function getOutlookData() {
  let endpoint = 'http://localhost:3000/getOutlookData';
  fetch(endpoint).then(response => console.log(response.json()));
}

function App() {

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

    getOutlookData();

  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
