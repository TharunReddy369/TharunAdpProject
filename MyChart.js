import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { analyticsData } from "../service/service";

Chart.register(CategoryScale);

const MyChart = () => {
  const [sent, setSent] = useState(50);
  const [unsent, setUnsent] = useState(50);

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = () => {
    analyticsData()
      .then((response) => {
        setSent(response.data.sent);
        setUnsent(response.data.unsent);
        console.log(response.data);
        console.log("heyy");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data = {
    labels: ["Sent", "Pending"],
    datasets: [
      {
        label: "",
        data: [sent, unsent],
        backgroundColor: ["#7ED7C1", "#DC8686"],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div
        class="card"
        style={{
          boxShadow: "0 0 10px rgba(100, 100, 100, 0.26)",
          width: "300px",
          height: "310px",
        }}
      >
        <div class="card-body">
          <Doughnut data={data} />
        </div>
      </div>
    </>
  );
};
export default MyChart;
