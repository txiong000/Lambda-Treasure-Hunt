import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// const API_KEY = process.env.REACT_API_KEY

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        room_id: 0,
        title: "",
        description: "",
        coordinates: "",
        players: [],
        items: [],
        exits: [],
        cooldown: 0,
        errors: [],
        messages: []
  }
  }
 
  componentDidMount = () => {
    const headers = {headers :{Authorization: 'Token 29a841c94d3f7ea3b66a8ed3bfa711168d7c5641'}}
    axios
    .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', headers)
    .then(response => {
      console.log(response.data)
      this.setState ({
        room_id: response.data.room_id,
        title: response.data.title,
        description: response.data.description,
        coordinates: response.data.coordinates,
        players: response.data.players,
        items: response.data.items,
        exits: response.data.exits,
        cooldown: response.data.cooldown,
        errors: response.data.error,
        messages: response.data.messages
      })
    })
    .catch(err => {
      console.log('err', err.response.data)
    })
  }


  render() {
    return (
      <div className="App">
        Test
      </div>
    );
  }
}

export default App;
