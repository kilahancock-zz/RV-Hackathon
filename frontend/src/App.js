import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './Navigation.js';
import Entertainment from './Entertainment.js';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/meta')
      .then(response => response.json())
      .then(data => console.log(data[0]));
  }, [])

  return (
    <div className="App">
      <Navigation/>
      <Entertainment />
    </div>
  );
}

export default App;
