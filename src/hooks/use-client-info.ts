"use client";

import { supabase } from "@/lib/supabase/client";
import useSWR from "swr";

const getClients = async () => {
  const { data, error } = await supabase.from("clients").select(`*`);

  if (error) throw error;

  return data;
};

export const useClient = () => {
  const { data } = useSWR("clients", getClients, { revalidateOnFocus: false });

  return {
    clients: data || [],
  };
};

export const getClientById = async (id: string) => {
  const { data, error } = await supabase
    .from("clients")
    .select(`*`)
    .eq("id", id);

  if (error) throw error;

  return data;
};

export const useClientById = () => {
  const { data } = useSWR("client_by_id", getClientById, {
    revalidateOnFocus: false,
  });

  return {
    client: data || [],
  };
};
