import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const DoughnutChart = ({ chartData = {}, options = null }) => {
  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
export default DoughnutChart;
