import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';

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

export default class Battle extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(id, player){
    this.setState({
      [id]: player
    })
  }

  render(){

    const { playerOne, playerTwo } = this.state;

    return(

      <React.Fragment>
        <Instructions/>
        {playerOne === null &&
          <PlayerInput
            label="Player One"
            onSubmit={(player) => this.handleSubmit('playerOne', player)}
          />
        }
        {playerTwo === null &&
          <PlayerInput
            label="Player Two"
            onSubmit={(player) => this.handleSubmit('playerTwo', player)}
          />
        }
      </React.Fragment>

    )
  }
}