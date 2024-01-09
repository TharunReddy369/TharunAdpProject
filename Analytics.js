import React from "react";
import LineChart from "./LineChart";
import MyChart from "./MyChart";

const Analytics = () => {
  return (
    <>
    <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MyChart />
          <div style={{ marginTop: "0.5rem" }}>
            <h4>Status Chart</h4>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LineChart />
          <div style={{ marginTop: "0.5rem" }}>
            <h4>Month Wise DOJ and Sentdate</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
