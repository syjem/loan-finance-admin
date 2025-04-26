import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Users } from "lucide-react";
import {
  getTotalCustomers,
  getTotalTransactions,
  getTransactionsTotalValue,
} from "@/app/actions";
import { formatCurrency } from "@/lib/utils";

const iconType = {
  totalValue: DollarSign,
  customers: Users,
  transactions: CreditCard,
};

export const DashboardInfoCards = async () => {
  const numberOfCustomers = getTotalCustomers();
  const totalTransactions = getTotalTransactions();
  const transactionsTotalValue = getTransactionsTotalValue();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CustomCard
        title="Customers"
        value={numberOfCustomers}
        type="customers"
      />
      <CustomCard
        title="Transactions"
        value={totalTransactions}
        type="transactions"
      />
      <CustomCard
        title="Total Value"
        value={transactionsTotalValue}
        type="totalValue"
      />
    </div>
  );
};

const CustomCard = async ({
  title,
  value,
  type,
}: {
  title: string;
  value: Promise<number | null> | Promise<number>;
  type: "transactions" | "customers" | "totalValue";
}) => {
  const Icon = iconType[type];
  const resolvedValue = await value;

  return (
    <Card className="bg-muted/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-slate-700 dark:text-gray-500" />}
      </CardHeader>
      <CardContent className="text-base md:text-xl font-bold">
        {type === "totalValue" && resolvedValue !== null
          ? formatCurrency(resolvedValue)
          : value}
      </CardContent>
    </Card>
  );
};
