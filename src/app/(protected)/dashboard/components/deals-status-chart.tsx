"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Approved", value: 45, color: "#10b981" },
  { name: "Pending", value: 30, color: "#f59e0b" },
  { name: "Under Review", value: 15, color: "#3b82f6" },
  { name: "Rejected", value: 10, color: "#ef4444" },
];

export function DealStatusChart() {
  return (
    <ChartContainer
      config={{
        approved: {
          label: "Approved",
          color: "#10b981",
        },
        pending: {
          label: "Pending",
          color: "#f59e0b",
        },
        review: {
          label: "Under Review",
          color: "#3b82f6",
        },
        rejected: {
          label: "Rejected",
          color: "#ef4444",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
