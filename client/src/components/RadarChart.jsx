import {
  Radar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChart({ scores }) {
  const data = {
    labels: [
      "Activity",
      "Code Quality",
      "Diversity",
      "Community",
      "Hiring"
    ],
    datasets: [
      {
        label: "Score",
        data: [
          scores.activity,
          scores.codeQuality,
          scores.diversity,
          scores.community,
          scores.hiringReady
        ]
      }
    ]
  };

  return <Radar data={data} />;
}

export default RadarChart;