"use client";

import useSWR from "swr";
import { supabase } from "@/lib/supabase/client";

const getRecentTransactions = async () => {
  const { data, error } = await supabase
    .from("recent_transactions")
    .select("*");

  if (error) throw error;

  return data;
};

export const useRecentTransactions = () => {
  const { data } = useSWR("recent_transactions", getRecentTransactions);

  return { recent_transactions: data };
};
