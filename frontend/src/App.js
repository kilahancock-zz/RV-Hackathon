import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Main from './containers/Main.js';

//debug helper
// function getTableColumns() {
//     //useEffect(() => {
//         fetch('http://localhost:3000/meta')
//             .then(response => response.json())
//             .then(data => console.log(data));
//     //}, []);
// }

//creates a new user in the system.
function createNewUser(firstName, lastName, emailAddress, password) {
    let success = false;
    if (firstName.includes("+")) {
        console.log("First name cannot include '+'.");
    } else if (lastName.includes("+")) {
        console.log("Last name cannot include '+'.");
    } else if (emailAddress.includes("+")) {
        console.log("Email address cannot include '+'.");
    } else if (password.includes("+")) {
        console.log("Password cannot include '+'.");
    } else {
        let queryStr = 'http://localhost:3000/newUser/' + firstName + "+" + lastName + "+" + emailAddress + "+" + password;
        fetch(queryStr)
            .then(response => console.log(response))
            .then(() => {success = true});
    }
    return success;
}

function alreadyExistUser(emailAddress) {
    if (emailAddress.includes("+")) {
        console.log("Email address cannot include '+'.");
    } else {
        let queryStr = 'http://localhost:3000/existUser/' + emailAddress;
        fetch(queryStr)
            .then(response => console.log(response));
    }
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
    alreadyExistUser("Billy@gmail.com");

  return (
    <div className="App">
      <Navigation />
      <Main />
    </div>
  );
}

export default App;
