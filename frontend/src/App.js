//import React, { useEffect } from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';

//debug helper
// function getTableColumns() {
//     //useEffect(() => {
//         fetch('http://localhost:3000/meta')
//             .then(response => response.json())
//             .then(data => console.log(data));
//     //}, []);
// }

//call this function whenever we desire a new user in the system.
//and the user has provided the appropriate credentials.
function createNewUser(firstName, lastName, emailAddress, password) {
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
        fetch(queryStr).then(response => console.log(response));
    }
}

function App() {

  createNewUser("Billy", "Bob", "Billy@gmail.com", "1234");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
