import { getRecentTransactions } from "@/app/data";

import React from "react";
import RecentTransactionsClient from "@/app/(protected)/dashboard/components/recent-transaction-client";

const RecentTransactionServer = async () => {
  const data = await getRecentTransactions();
  return <RecentTransactionsClient initialData={data ?? []} />;
};

export default RecentTransactionServer;
