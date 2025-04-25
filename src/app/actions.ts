"use server";

import { createClient } from "@/lib/supabase/server";

export const getTotalCustomers = async () => {
  const supabase = createClient();
  const { count, error } = await (await supabase)
    .from("customers")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(`Failed to fetch customers count: ${error.message}`);
  }

  return count;
};

export const getTotalTransactions = async () => {
  const supabase = createClient();
  const { count, error } = await (await supabase)
    .from("transactions")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(`Failed to fetch transactions count: ${error.message}`);
  }

  return count;
};

export const getTransactionsTotalValue = async () => {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("transactions")
    .select("value", { count: "exact", head: false });

  if (error) {
    throw new Error(
      `Failed to fetch total value of transactions: ${error.message}`
    );
  }

  const totalValue = data.reduce(
    (acc, transaction) => acc + transaction.value,
    0
  );

  return totalValue ?? 0;
};
