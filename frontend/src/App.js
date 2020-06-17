import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './Navigation.js'

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/meta')
      .then(response => response.json())
      .then(data => console.log(data[0]));
  }, [])

  return (
    <div className="App">
      <Navigation/>
    </div>
  );
}

export default App;
