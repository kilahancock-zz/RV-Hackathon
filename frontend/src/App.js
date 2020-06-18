import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Main from './containers/Main.js';
import Login from './containers/Login.js';


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
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
