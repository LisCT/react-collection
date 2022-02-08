import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Result from "./Result";

function Instructions (){
  return(
    <div>
      <h1 className="box-intro">Instructions</h1>
      <div className="box-wrapper">
        <div className="box">
          <div className="box-content">
            <h1 className="box-header">Github users</h1>
            <FaUserFriends className="box-icon" color="ffc072" size={88}/>
          </div>
        </div>
        <div className="box">
        <div className="box-content">
          <h1 className="box-header">Battle</h1>
          <FaFighterJet className="box-icon" color="ffc072" size={88}/>
        </div>
      </div>
      <div className="box">
      <div className="box-content">
        <h1 className="box-header">Winners</h1>
        <FaTrophy className="box-icon" color="ffc072" size={88}/>
      </div>
    </div>
      </div>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render(){

    const { username } = this.state;

    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">{this.props.label}</label>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.handleChange}
            autoComplete="off"
            placeholder="Github Username"
          />
        </div>
        <button
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview ({username, onReset,label} ){
  return(
    <div>
      <h3>{label}</h3>
      <div>
        <img
          src={`https://github.com/${username}.png?size=200` }
          alt={`avatar for ${username}`}
        />
        <a href="https://github.com/${username}">
          {username}
        </a>
      </div>
      <button onClick={onReset}>
        <FaTimesCircle color='rgb(194,57,42' size={26}/>
      </button>
    </div>
  )
}

PlayerPreview.prototype = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}
export default class Battle extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleBattle = this.handleBattle.bind(this)
  }

  handleSubmit(id, player){
    this.setState({
      [id]: player
    })
  }

  handleReset(id){
    this.setState({
      [id]: null
    })
  }

  handleBattle(){
    this.setState({
      battle: true
    })
  }

  render(){

    const { playerOne, playerTwo, battle } = this.state;

    if(battle){
      return <Result playerOne={playerOne} playerTwo={playerTwo}/>
    }

    return(

      <React.Fragment>
        <Instructions/>
        {playerOne === null
          ?
            <PlayerInput
              label="Player One"
              onSubmit={(player) => this.handleSubmit('playerOne', player)}
            />
          : <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={ () => this.handleReset("playerOne")}
            />
        }
        {playerTwo === null
          ?
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => this.handleSubmit('playerTwo', player)}
            />
          : <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={ () => this.handleReset("playerTwo")}
            />
        }

        {playerOne && playerTwo && (
          <button
            onClick={this.handleBattle}
          >
            Battle
          </button>
        )}
      </React.Fragment>

    )
  }
}