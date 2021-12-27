import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';

function Battle (){
  return(
    <div>
      <h1 className="box-intro">Instructions</h1>
      <div className="box-wrapper">
        <div className="box">
          <div className="box-content">
            <h1 className="box-header">Githib users</h1>
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

export default Battle;