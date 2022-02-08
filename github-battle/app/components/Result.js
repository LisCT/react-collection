import React from 'react';
import { battle } from '../utils/api';

export default class Result extends React.Component{

  componentDidMount(){
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
    .then((player) => {
      console.log(player);
    })
  }

  render(){
    return(
      <div>
       <pre> {JSON.stringify(this.props, null, 2)} </pre>
      </div>
    )
  }
}