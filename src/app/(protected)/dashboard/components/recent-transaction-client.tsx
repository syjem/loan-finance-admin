"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/lib/utils";
import { useRecentTransactions } from "@/hooks/subscriptions/use-recent-transactions";

type Transaction = {
  name: string;
  email: string;
  avatar: string;
  value: number;
  purpose: string;
};

const RecentTransactionsClient = ({
  initialData,
}: {
  initialData: Transaction[];
}) => {
  const { data: recent = initialData } = useRecentTransactions();
  return (
    <Card className="shadow-md border bg-muted/50">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {recent?.map((item: Transaction, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback className="text-xs">
                    {getInitials(item.name)}
                  </AvatarFallback>
                </Avatar>
                <dl className="flex flex-col leading-5">
                  <dt className="font-semibold text-start">{item.name}</dt>
                  <dd title={item.email} className="text-muted-foreground/60">
                    {`${item.purpose} loan`}
                  </dd>
                </dl>
              </div>

              <span className="font-semibold">
                {formatCurrency(item.value)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsClient;
