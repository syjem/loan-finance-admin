"use client";

import { Chart } from "react-charts";
import { useChart } from "@/hooks/use-chart";
import { useTransactionSubscription } from "@/hooks/use-transaction-subcription";

const TransactionChart = () => {
  useTransactionSubscription();
  const { chartOptions } = useChart();

  return <Chart options={chartOptions} />;
};

export default TransactionChart;
