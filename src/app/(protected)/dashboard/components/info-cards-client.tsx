"use client";

import { DollarSign, CreditCard, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionStats } from "@/hooks/subscriptions/use-transaction-stats";

const iconType = {
  totalValue: DollarSign,
  clients: Users,
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
  const { data: stats = initialStats } = useTransactionStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CustomCard title="Clients" value={numberOfCustomers} type="clients" />
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
  type: "transactions" | "clients" | "totalValue";
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
