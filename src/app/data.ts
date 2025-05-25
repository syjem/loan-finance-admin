"use server";

import { createClient } from "@/lib/supabase/server";

export const getClients = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select(`*, loans(id, created_at, amount)`);

  if (error) return [];

  return data || [];
};

export const getClientById = async (id: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("clients")
    .select(`*, loans(id, created_at, amount)`)
    .eq("id", id);

  return data || [];
};

export const getTotalNumberOfClients = async () => {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count ?? 0;
};

export const getActiveBorrowers = async () => {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("clients")
    .select("status", { count: "exact", head: true })
    .eq("status", "active");

  if (error) return 0;
  return count ?? 0;
};

export const getBusinessClients = async () => {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("clients")
    .select("type", { count: "exact", head: true })
    .eq("type", "business");

  if (error) return 0;
  return count ?? 0;
};

export const getClientsThisMonth = async () => {
  const now = new Date();
  const firstDayOfTheMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();

  const firstDayNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  ).toISOString();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("id")
    .gte("created_at", firstDayOfTheMonth)
    .lt("created_at", firstDayNextMonth);

  if (error) return 0;
  return data?.length ?? 0;
};

export const getLoanStats = async () => {
  const supabase = await createClient();
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
};

export const getClientsTotalValue = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("clients_total_value").select("*");

  return data;
};

export const getRecentLoanApplications = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("recent_loan_applications").select("*");

  return data ?? [];
};

export const getClientLoansById = async (id: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("loans")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  return data ?? [];
};

export const getLoansById = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("loans")
    .select(`*, clients(*)`)
    .eq("id", id);

  if (error) return [];

  return data ?? [];
};
