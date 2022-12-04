import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const PieChart = ({ chartData = {}, options = null }) => {
  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};
export default PieChart;
