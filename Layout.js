import React from 'react'
import { Outlet } from "react-router-dom";
import MainHeader from './MainHeader';
// import Navbar from './Navbar';


const Layout = () => {
  return (
    <>
    <MainHeader />
    <Outlet />
    </>
  )
}

export default Layout