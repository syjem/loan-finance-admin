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
import { useMonthlyStats } from "@/hooks/subscriptions/use-monthly-stats";

type Stats = {
  active: number;
  overdue: number;
  completed: number;
  name: string;
};

export function MonthlyDealsChart({ stats: initialStats }: { stats: Stats[] }) {
  const { data: stats = initialStats } = useMonthlyStats();

  return (
    <ChartContainer
      config={{
        active: {
          label: "Active",
          color: "oklch(49.6% 0.265 301.924)",
        },
        overdue: {
          label: "Overdue",
          color: "oklch(68.1% 0.162 75.834)",
        },
        completed: {
          label: "Completed",
          color: "oklch(62.7% 0.194 149.214)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend className="capitalize" />
          <Bar dataKey="active" stackId="a" fill="var(--color-active)" />
          <Bar dataKey="overdue" stackId="a" fill="var(--color-overdue)" />
          <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
