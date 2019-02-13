import React from 'react'

const Info = (props) => {
    return <div>
        <h5>Room id: {props.room_id}</h5>
        <h5>Title: {props.title}</h5>
        <h5>Description: {props.description}</h5>
        <h5>Coordinates {props.coordinates}</h5>
        <h5>Player: {props.players}</h5>
        <h5>Items: {props.items}</h5>
        <h5>Exits: {props.exits}</h5>
        <h5>Cooldown: {props.cooldown}</h5>
        <h5>Error: {props.errors}</h5>
        <h5>messages :{props.messages}</h5>
    </div>
}

export default Info