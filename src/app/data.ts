"use server";

import { createClientCheck } from "@/lib/supabase/create-client-check";
import { createClient } from "@/lib/supabase/server";

export const getTotalClients = async () => {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  if (error) {
    return 0;
  }

  return count ?? 0;
};

export const getLoanStats = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { count: totalTransactions } = await supabase
      .from("loans")
      .select("*", { count: "exact", head: true });

    const { data } = await supabase.from("loans").select("amount");

    const transactionsTotalValue = data
      ? data.reduce((acc, tx) => acc + tx.amount, 0)
      : 0;

    return {
      totalTransactions: totalTransactions ?? 0,
      transactionsTotalValue,
    };
  });

  return result ?? { totalTransactions: 0, transactionsTotalValue: 0 };
};

export const getClientsTotalValue = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("clients_total_value").select("*");

  return data;
};

export const getRecentLoanApplications = async () => {
  const result = await createClientCheck(async (supabase) => {
    const { data } = await supabase
      .from("recent_loan_applications")
      .select("*");

    return data;
  });

  return result ?? [];
};

export const getClientById = async (id: string) => {
  const result = await createClientCheck(async (supabase) => {
    const { data } = await supabase.from("customers").select("*").eq("id", id);

    return data;
  });

  return result;
};

export const getClientTransactionById = async (id: string) => {
  const result = await createClientCheck(async (supabase) => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("customer_id", id)
      .order("created_at", { ascending: false });

    return data;
  });

  return result;
};
