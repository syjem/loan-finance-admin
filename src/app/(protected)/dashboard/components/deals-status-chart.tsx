"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useStatusStats } from "@/hooks/subscriptions/use-status-stats";

type Stats = {
  name: string;
  value: number;
  color: string;
};

export function DealStatusChart({ stats: initialStats }: { stats: Stats[] }) {
  const { data: stats = initialStats } = useStatusStats();

  return (
    <ChartContainer
      config={{
        active: {
          label: "Active",
        },
        overdue: {
          label: "Overdue",
        },
        completed: {
          label: "Completed",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            className="capitalize"
            data={stats}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {stats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
