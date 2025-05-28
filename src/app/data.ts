"use server";

import { format } from "date-fns";
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

export const getAllLoans = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("all_loan_applications")
    .select(`*`)
    .limit(10);

  if (error) return [];

  return data ?? [];
};

export const getLoanStatusPercentage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("loans").select("status");

  if (error) {
    console.error("Error fetching loans:", error);
    return [];
  }

  const counts: Record<string, number> = {};

  for (const loan of data) {
    const status = loan.status || "Unknown";
    counts[status] = (counts[status] || 0) + 1;
  }

  const colorMap: Record<string, string> = {
    active: "oklch(49.6% 0.265 301.924)",
    overdue: "oklch(68.1% 0.162 75.834)",
    completed: "oklch(62.7% 0.194 149.214)",
  };

  return Object.entries(counts).map(([status, value]) => ({
    name: status,
    value,
    color: colorMap[status] || "#ccc",
  }));
};

export const getLoanMonthlyStats = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("loans")
    .select("created_at, status");

  if (error) return [];

  const monthlyStats: Record<
    string,
    { active: number; overdue: number; completed: number }
  > = {};

  for (const loan of data) {
    if (!loan.created_at || !loan.status) continue;

    // Convert date to month name (e.g. Jan, Feb)
    const month = format(new Date(loan.created_at), "MMM");

    // Initialize month if not exists
    if (!monthlyStats[month]) {
      monthlyStats[month] = { active: 0, overdue: 0, completed: 0 };
    }

    // Add count to the correct status
    const status = loan.status.toLowerCase();
    if (status in monthlyStats[month]) {
      monthlyStats[month][status as "active" | "overdue" | "completed"]++;
    }
  }

  // Format the result
  const orderedMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const result = orderedMonths
    .filter((month) => monthlyStats[month])
    .map((month) => ({
      name: month,
      ...monthlyStats[month],
    }));

  return result;
};
