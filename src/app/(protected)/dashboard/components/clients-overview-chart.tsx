"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useClientsTotalValue } from "@/hooks/subscriptions/use-clients-total-value";

type BarChartType = {
  firstName: string;
  total_value: number;
};

const chartConfig = {
  value: {
    label: "Total",
    color: "#8833e6",
  },
} satisfies ChartConfig;

const ClientsOverviewChart = ({
  clientsTotalValue,
}: {
  clientsTotalValue: BarChartType[] | null;
}) => {
  const { data = clientsTotalValue } = useClientsTotalValue();

  const chartData = data
    ?.sort((a, b) => a.total_value - b.total_value)
    ?.map((item: BarChartType) => ({
      name: item.firstName,
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

export default ClientsOverviewChart;
