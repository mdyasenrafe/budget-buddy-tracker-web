import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type DoughnutChartProps = ChartData<"doughnut">;

export const DoughnutChart = ({ labels, datasets }: DoughnutChartProps) => {
  const chartData: ChartData<"doughnut"> = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      borderWidth: dataset?.borderWidth ?? 2,
      hoverOffset: dataset?.hoverOffset ?? 10,
    })),
  };

  const options: ChartOptions<"doughnut"> = {
    maintainAspectRatio: false,
    // aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          font: {
            size: 12,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) =>
            `${tooltipItem.label}: ৳${tooltipItem.raw as number}`,
        },
      },
    },
    cutout: "60%",
  };

  return <Doughnut data={chartData} options={options} />;
};
