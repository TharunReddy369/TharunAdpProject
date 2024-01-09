import Card from "./Card.js";
import React from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    navigate("/");
  };

  return (
    <>
      <Card className={`${styles.box} ${props.className}`}>
        <div className={styles.profile_top}>
          <img src="../adp.png" className={styles.circle} alt="apd" />
        </div>

        <div className={styles.profile_middle}>
          {/* <p>John</p> */}
          <button
            className={`${styles.a} bg-blue-700 text-white hover:bg-red-600 mt-2`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className={styles.profile_bottom}></div>
      </Card>
    </>
  );
};

export default Profile;
