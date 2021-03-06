import React from 'react';
import { battle } from '../utils/api';

export default class Result extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }

  }
  componentDidMount(){
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
    .then((player) => {
      this.setState({
        winner: player[0],
        loser: player[1],
        error: null,
        loading: false
      })
    })
    .catch((message) => {
      this.setState({
        error: message,
        loading: false
      })
    })
  }

  render(){
    return(
      <div>
       <pre> {JSON.stringify(this.state, null, 2)} </pre>
      </div>
    )
  }
}