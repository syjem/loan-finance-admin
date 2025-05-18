"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    name: "Jan",
    approved: 20,
    pending: 15,
    rejected: 5,
  },
  {
    name: "Feb",
    approved: 25,
    pending: 18,
    rejected: 7,
  },
  {
    name: "Mar",
    approved: 30,
    pending: 20,
    rejected: 8,
  },
  {
    name: "Apr",
    approved: 28,
    pending: 22,
    rejected: 6,
  },
  {
    name: "May",
    approved: 32,
    pending: 24,
    rejected: 9,
  },
  {
    name: "Jun",
    approved: 35,
    pending: 25,
    rejected: 10,
  },
];

export function MonthlyDealsChart() {
  return (
    <ChartContainer
      config={{
        approved: {
          label: "Approved",
          color: "hsl(var(--chart-1))",
        },
        pending: {
          label: "Pending",
          color: "hsl(var(--chart-2))",
        },
        rejected: {
          label: "Rejected",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="approved" stackId="a" fill="var(--color-approved)" />
          <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
          <Bar dataKey="rejected" stackId="a" fill="var(--color-rejected)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
