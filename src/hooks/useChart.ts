import { useClientTransactions } from "./useTransaction";
import { AxisOptions, ChartOptions } from "react-charts";

type Metric = {
  customer_id: string;
  name: string;
  total_value: number;
};

type DataPoint = {
  primary: string;
  secondary: number;
};

export const useChart = () => {
  const { transaction } = useClientTransactions();

  const y_max = () => {
    if (transaction.length > 0) {
      const maxSum = Math.max(...transaction.map((t: Metric) => t.total_value));
      return maxSum + 2000;
    }
    return 5000;
  };

  const primaryAxis: AxisOptions<DataPoint> = {
    getValue: (d) => d.primary,
    scaleType: "band",
    position: "bottom",
  };

  const secondaryAxes: AxisOptions<DataPoint>[] = [
    {
      getValue: (d) => d.secondary,
      scaleType: "linear",
      min: 0,
      max: y_max(),
    },
  ];

  const chartData = [
    {
      data: [...transaction]
        .sort((a, b) => a.total_value - b.total_value)
        .map((t: Metric) => ({
          primary: t.name,
          secondary: t.total_value,
        })),
    },
  ];

  const chartOptions: ChartOptions<DataPoint> = {
    data: chartData,
    primaryAxis,
    secondaryAxes,
    defaultColors: ["#8833e6"],
    tooltip: {
      show: true,
    },
  };

  return { chartOptions };
};
