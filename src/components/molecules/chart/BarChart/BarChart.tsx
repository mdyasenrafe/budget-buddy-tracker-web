import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type BarChartProps = ChartData<"bar">;

export const BarChart = ({ labels, datasets }: BarChartProps) => {
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      borderWidth: dataset?.borderWidth ?? 1,
      barThickness: dataset?.barThickness ?? "flex",
      borderRadius: dataset?.borderRadius ?? 4,
      barPercentage: dataset?.barPercentage ?? 0.8,
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) =>
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

  return <Bar data={chartData} options={options} />;
};
