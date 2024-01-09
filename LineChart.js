import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { analyticsCombined } from "../service/service";


Chart.register(CategoryScale);

const LineChart = () => {
  const [sentdate, setSentdate] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 1,
    Oct: 0,
    Nov: 5,
    Dec: 0,
  });
  const [doj, setDoj] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 1,
    Oct: 0,
    Nov: 5,
    Dec: 0,
  });

  useEffect(() => {
    getAnalytics();
  }, []);

  const getAnalytics = () => {
    analyticsCombined()
      .then((response) => {
        setSentdate(response.data.bySentDate);
        setDoj(response.data.byDoj);
        console.log(response.data.bySentDate);
        console.log(response.data.byDoj);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of applicants based on DOJ",
        data: [
          doj.Jan,
          doj.Feb,
          doj.Mar,
          doj.Apr,
          doj.May,
          doj.Jun,
          doj.Jul,
          doj.Aug,
          doj.Sep,
          doj.Oct,
          doj.Nov,
          doj.Dec,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Number of applicants based on sentdate",
        data: [
          sentdate.Jan,
          sentdate.Feb,
          sentdate.Mar,
          sentdate.Apr,
          sentdate.May,
          sentdate.Jun,
          sentdate.Jul,
          sentdate.Aug,
          sentdate.Sep,
          sentdate.Oct,
          sentdate.Nov,
          sentdate.Dec,
        ],
        fill: false,
        borderColor: "#FF8F8F",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div
        class="card"
        style={{
          boxShadow: "0 0 10px rgba(100, 100, 100, 0.26)",
          width: "550px",
          height: "310px",
        }}
      >
        <div class="card-body">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
