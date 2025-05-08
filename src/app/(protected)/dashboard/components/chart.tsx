"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "@/hooks/use-transaction";
import { useTransactionSubscription } from "@/hooks/use-transaction-subcription";

type Metric = {
  name: string;
  total_value: number;
};

const chartConfig = {
  value: {
    label: "Total",
    color: "#8833e6",
  },
} satisfies ChartConfig;

const TransactionChart = () => {
  useTransactionSubscription(); // subscription
  const { transaction } = useTransactions();

  const chartData = transaction
    .sort((a, b) => a.total_value - b.total_value)
    .map((item: Metric) => ({
      name: item.name,
      value: item.total_value,
    }));

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full min-h-[200px] max-h-[300px] p-2"
    >
      <BarChart accessibilityLayer data={chartData} className="h-full w-full">
        <CartesianGrid />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => value.split(" ")[0]}
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default TransactionChart;
