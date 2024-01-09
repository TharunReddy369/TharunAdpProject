import React from "react";
import styles from "./MainHeader.module.css";
import Navbar from "./Navbar";
import Profile from "./Profile";

const MainHeader = (props) => {
  return (
    <main
      className={`${styles.main}  bg-blue-800 shadow-xl shadow-slate-400 text-gray-100 flex  justify-between items-center p-2`}
    >
      <div className={`${styles["img-div"]}`}>
        <img
          src="../adp.png"
          alt="Logo"
          style={{}}
          className="d-inline-block align-top"
        ></img>
      </div>
      <Navbar />

      <div className={styles.profile_icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 -1 25 26"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>

        <Profile className={styles.profile} />
      </div>
    </main>
  );
};

export default MainHeader;
