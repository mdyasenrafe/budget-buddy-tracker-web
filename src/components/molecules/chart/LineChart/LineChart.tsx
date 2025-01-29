import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type LineChartProps = ChartData<"line">;

export const LineChart = ({ labels, datasets }: LineChartProps) => {
  const chartData: ChartData<"line"> = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      fill: dataset.backgroundColor ? true : false,
      borderWidth: dataset?.borderWidth ?? 2,
      tension: dataset?.tension ?? 0.2,
      pointRadius: dataset?.pointRadius ? dataset?.pointRadius : 4,
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) =>
            `${tooltipItem.dataset.label}: ৳${tooltipItem.raw as number}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "Poppins",
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "#e0e0e0",
        },
        ticks: {
          font: {
            size: 12,
            family: "Poppins",
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
