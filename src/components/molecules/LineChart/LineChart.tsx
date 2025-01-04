import { Line } from "react-chartjs-2";
import { ChartData, ChartDataset, ChartOptions, TooltipItem } from "chart.js";

type LineChartDataset = ChartDataset<"line">;

type LineChartProps = {
  labels: string[];
  datasets: LineChartDataset[];
};

export const LineChart = ({ labels, datasets }: LineChartProps) => {
  const chartData: ChartData<"line"> = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      fill: dataset.backgroundColor ? true : false,
      borderWidth: dataset?.borderWidth ?? 2,
      tension: dataset?.tension ?? 0.6,
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
