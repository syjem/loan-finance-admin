import useSWR from "swr";
import supabase from "@/supabase-client";

const getRecentTransactions = async () => {
  const { data, error } = await supabase
    .from("recent_transactions")
    .select("*");

  if (error) throw error;

  return data;
};

export const useRecentTransactions = () => {
  const { data } = useSWR("recent_trancations", getRecentTransactions);

  return { recent_transactions: data };
};
