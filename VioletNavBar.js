import React from 'react';
import { NavLink } from 'react-router-dom';
import './VioletNavBar.css';


const VioletNavBar =() => {


  const headerStyle = {
    textAlign: 'left',
    
  };
  const logoStyle = {
    display: 'block',
    marginLeft: '1',
  };


    return(


        <nav className="navbar navbar-expand-lg navbar-light bg-violet" style={{height:'70px'}}>


      <div className="container" style={{display:'flex', justifyContent:''}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
          <div>

        <a className="navbar-brand" href="#">
          <img
            src = "../adp.png"
            alt="Logo"
            style={{}}
            height="30"
            className="d-inline-block align-top"></img>                         
        </a>
            </div>

        <NavLink  to="/home" className={{}}>Home</NavLink>  
        <NavLink  to="/list" className={{}}>Send Letter</NavLink>            
          
        </div>
      </div>
      </nav>


    )
}


export default VioletNavBar; 