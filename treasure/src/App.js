import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_KEY = process.env.REACT_API_KEY

class App extends Component {
  
  componentDidMount = () => {
    const headers = {headers:{Authorization: API_KEY }}
    axios
    .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', headers)
    .then(response => {
      console.log(response.data)
    })
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
