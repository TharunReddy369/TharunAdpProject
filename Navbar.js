import React from "react";
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
function Navbar(props){

 

    return <nav className={`${styles.navbar}   w-full mx-5`}>
        <ul>
            <li style={{}}>
                <NavLink exact to="/home/display" style={{}} className={(nav) => (nav.isActive ? `${styles["active"]}` : `${styles["unactive"]}`)}>Home</NavLink>
            </li>
        <li>
                <NavLink  to="/home/list" className={(nav) => (nav.isActive ? `${styles["active"]}` : `${styles["unactive"]}`)}>Send E Letter</NavLink>
            </li>
            <li>
                <NavLink  to="/home/analytics" className={(nav) => (nav.isActive ? `${styles["active"]}` : `${styles["unactive"]}`)}>Analytics</NavLink>
            </li>
            <li>
                <NavLink  to="/home/preview" className={(nav) => (nav.isActive ? `${styles["active"]}` : `${styles["unactive"]}`)}>Preview</NavLink>
            </li>
            

        </ul>
    </nav>
}

export default Navbar;