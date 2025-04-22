import supabase from "@/supabase-client";
import useSWR from "swr";

const getClientTransactions = async () => {
  const { data, error } = await supabase
    .from("customer_total_value")
    .select("*");

  if (error) throw error;

  return data;
};

export const useClientTransactions = () => {
  const { data } = useSWR("transactions", getClientTransactions);

  return { transaction: data || [] };
};
