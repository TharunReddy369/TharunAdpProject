import React from "react";
import DisplayTable from "./DisplayTable";
import "./DisplayTable.css";

const Home = () => {
  return (
    <>
      <div style={{ marginTop: "30px" }}>
      <div className="info_card rounded p-3 m-3">
            <div className=" Roles">
              <div className="flex items-center align-middle justify-center">
        
                <i>
              <p className="text-black mt-2">
                Please send offer letters to candidates by clicking on Send E Letter Button or you can select template from dropdown.
                {/* You can Upload data or send letters to candidates based on letter type. */}
              </p>
            </i>
              
              </div>
            </div>
          
          </div>
        <DisplayTable />
      </div>
    </>
  );
};

export default Home;
