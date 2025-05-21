"use client";

import { DollarSign, FileText, Users, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoanStats } from "@/hooks/subscriptions/use-transaction-stats";

const iconType = {
  totalValue: DollarSign,
  clients: Users,
  deals: FileText,
  approvalRate: TrendingUp,
};

type Props = {
  numberOfClients: number;
  initialStats: {
    totalTransactions: number;
    transactionsTotalValue: number;
  };
};

const OverviewCards = ({ numberOfClients, initialStats }: Props) => {
  const { data: stats = initialStats } = useLoanStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CustomCard
        title="Total Loan Value"
        value={stats.transactionsTotalValue}
        type="totalValue"
        description="+20.1% from last month"
      />
      <CustomCard
        title="Number of Clients"
        value={numberOfClients}
        type="clients"
        description="+12 new clients this month"
      />
      <CustomCard
        title="New Deals This Month"
        value={stats.totalTransactions}
        type="deals"
        description="+5.2% from last month"
      />
      <CustomCard
        title="Approval Rate"
        value={78.5}
        type="approvalRate"
        description="+2.1% from last month"
      />
    </div>
  );
};

export default OverviewCards;

type CardProps = {
  title: string;
  value: number | null;
  type: "deals" | "clients" | "totalValue" | "approvalRate";
  description: string;
};

const CustomCard = ({ title, value, type, description }: CardProps) => {
  const Icon = iconType[type];

  return (
    <Card className="bg-muted/50 gap-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-base md:text-xl font-bold">
          {type === "totalValue" && value !== null
            ? formatCurrency(value)
            : value}
          {type === "approvalRate" && `%`}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
