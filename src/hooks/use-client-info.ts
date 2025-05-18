"use client";

import { supabase } from "@/lib/supabase/client";
import useSWR from "swr";

const getClients = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select(`id, name, email, avatar`);

  if (error) throw error;

  return data;
};

export const useClientInfo = () => {
  const { data } = useSWR("clients", getClients, { revalidateOnFocus: false });

  return {
    clients: data || [],
  };
};
