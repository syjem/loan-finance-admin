"use server";

import { createClientCheck } from "@/lib/supabase/create-client-check";

export const getTotalCustomers = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { count, error } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    if (error) throw new Error(error.message);

    return count ?? 0;
  });

  return result ?? 0;
};

export const getTransactionStats = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { count: totalTransactions } = await supabase
      .from("transactions")
      .select("*", { count: "exact", head: true });

    const { data } = await supabase.from("transactions").select("value");

    const transactionsTotalValue = data
      ? data.reduce((acc, tx) => acc + tx.value, 0)
      : 0;

    return {
      totalTransactions: totalTransactions ?? 0,
      transactionsTotalValue,
    };
  });

  return result ?? { totalTransactions: 0, transactionsTotalValue: 0 };
};
