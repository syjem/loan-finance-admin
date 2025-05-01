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

export const getClientsTotalValue = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { data } = await supabase.from("customer_total_value").select("*");

    return data;
  });

  return result;
};

export const getRecentTransactions = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { data } = await supabase.from("recent_transactions").select("*");

    return data;
  });

  return result;
};

export const getClients = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { data } = await supabase.from("customers").select("*");

    return data;
  });

  return result;
};
