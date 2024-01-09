import React from "react";
import "./HomePage.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import EditCandidates from "./components/EditCandidates";
import Layout from "./components/Layout";
import Analytics from "./components/Analytics";
import Preview from "./components/Preview";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/home" element={<Layout />}>
          <Route path="/home/display" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/home/list" element={<EditCandidates />}></Route>
          <Route path="/home/analytics" element={<Analytics />}></Route>
          <Route path="/home/preview" element={<Preview />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
