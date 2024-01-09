import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const Dropdownn = () => {
  const [selectedvalue, setSelectedValue] = useState("");

  const navigate = useNavigate();

  const handleSelect = (Value) => {
    setSelectedValue(Value);
    console.log(Value);
    navigate("/home/list", { state: Value });
  };

  return (
    <>
      <div
        class="card"
        style={{
          boxShadow: "0 0 10px rgba(100, 100, 100, 0.26)",
          // backgroundColor:"#FFF6F6",
          backgroundColor:"#CAEDFF",
          width: "300px",
          height: "250px",
        }}
      >
        <div
          class="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <h4>Select Template</h4>
          <br />
          <div>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle
                style={{ color: "black", backgroundColor: "#AEDEFC" }}
                variant=""
                id="dropdown-basic"
              >
                {selectedvalue || "Select Value"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="offer_letter">
                  Offer Letter
                </Dropdown.Item>
                <Dropdown.Item eventKey="bonus_letter">
                  Bonus Letter
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdownn;
