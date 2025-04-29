import { getRecentTransactions } from "@/app/supabase-queries";

import React from "react";
import RecentTransactionsClient from "@/components/recent-transaction-client";

const RecentTransactionServer = async () => {
  const data = await getRecentTransactions();
  return <RecentTransactionsClient initialData={data ?? []} />;
};

export default RecentTransactionServer;
