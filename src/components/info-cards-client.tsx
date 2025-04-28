"use client";

import {
  useTransactionsRealtimeUpdate,
  transactionStatsKey,
} from "@/hooks/subscriptions/use-realtime-transaction";
import useSWR from "swr";
import { getTransactionStats } from "@/app/actions";
import { DollarSign, CreditCard, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconType = {
  totalValue: DollarSign,
  customers: Users,
  transactions: CreditCard,
};

type Props = {
  numberOfCustomers: number;
  initialStats: {
    totalTransactions: number;
    transactionsTotalValue: number;
  };
};

export const DashboardInfoCardsClient = ({
  numberOfCustomers,
  initialStats,
}: Props) => {
  useTransactionsRealtimeUpdate();

  const { data: stats = initialStats } = useSWR(
    transactionStatsKey,
    getTransactionStats
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CustomCard
        title="Customers"
        value={numberOfCustomers}
        type="customers"
      />
      <CustomCard
        title="Transactions"
        value={stats.totalTransactions}
        type="transactions"
      />
      <CustomCard
        title="Total Value"
        value={stats.transactionsTotalValue}
        type="totalValue"
      />
    </div>
  );
};

type CardProps = {
  title: string;
  value: number | null;
  type: "transactions" | "customers" | "totalValue";
};

const CustomCard = ({ title, value, type }: CardProps) => {
  const Icon = iconType[type];

  return (
    <Card className="bg-muted/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-slate-700 dark:text-gray-500" />}
      </CardHeader>
      <CardContent className="text-base md:text-xl font-bold">
        {type === "totalValue" && value !== null
          ? formatCurrency(value)
          : value}
      </CardContent>
    </Card>
  );
};
