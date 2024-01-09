import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const ChartDesg = () => {
  const data = {
    labels: ['Sent', 'Pending'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, ],
        backgroundColor: [
          'rgb(255, 205, 86)',
             'rgb(54, 162, 235)',
            //  'rgb(44,151,44)',
            //  'rgb(231,139,33)',                  
           ],
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
    <div class="card" style={{boxShadow: '0 0 10px rgba(100, 100, 100, 0.26)', width:'400px', height:'400px'}}>
      <div class="card-body">
      <Doughnut data={data} />
  </div>
</div>
    </>
  );
};
export default ChartDesg;