import supabase from "@/supabase-client";
import useSWR from "swr";

const getCleints = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select(`id, name, email, avatar`);

  if (error) throw error;

  return data;
};

export const useClientInfo = () => {
  const { data } = useSWR("clients", getCleints);

  return {
    clients: data || [],
  };
};
