import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Buttons from './components/Buttons'
import InfoComponents from './components/InfoComponent'

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
  this.graph = {}
  if (localStorage.getItem("graph")) {
    this.graph = JSON.parse(localStorage.getItem("graph"))
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
        messages: response.data.messages,
      })
    })
    .catch(err => {
      console.log('err', err.response.data)
    })
  }

  


  automated = () => {

    this.interval = setInterval(()=>{
      if(!this.graph[this.state.room_id]) {
        const object = {}
        for (let room of this.state.exits) {
          object[room] = '?'
        }
        this.graph[this.state.room_id] = [this.state.coordinates, object]
      }
      
      let direction = this.state.exits[Math.floor(Math.random() * this.state.exits.length)]
      console.log("direction of automated",direction)
      
      this.moveMent(direction)
      localStorage.setItem("graph", JSON.stringify(this.graph))
    }, 7000)
    
  }


// Get Axios call to server init
// Set state to response data
// Build manual direction movement
// Build a graph = {}
// Build automated traverse





  moveMent = (direction) =>{
    const prev_room = this.state.room_id
    const headers = {headers: {Authorization: 'Token 29a841c94d3f7ea3b66a8ed3bfa711168d7c5641' }}
    const move = {direction: direction}
   axios
  .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', move, headers)
  .then(response => {
    console.log(response.data)
    this.setState({
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
    const inverse = { n: 's', s: 'n', w: 'e', e: 'w' };
    if(!this.graph[this.state.room_id]) {
      const object = {}
      for (let room of this.state.exits) {
        object[room] = '?'
      }
      this.graph[this.state.room_id] = [this.state.coordinates, object]
    }
    this.graph[prev_room][1][direction] = this.state.room_id
    this.graph[this.state.room_id][1][inverse[direction]] = prev_room
  })
} 
  

  render() {
    return (
      <div className="App">
        <Buttons  moveMent={this.moveMent} automated = {this.automated}/>
        <InfoComponents room_id = {this.state.room_id}
              title = {this.state.title}
              description = {this.state.description}
              coordinates = {this.state.coordinates}
              players = {this.state.players}
              items = {this.state.items}
              exits = {this.state.exits}
              cooldown = {this.state.cooldown}
              errors = {this.state.errors}
              messages = {this.state.messages}  />
      </div>
    );
  }
}

export default App;
