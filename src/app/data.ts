"use server";

import { createClient } from "@/lib/supabase/server";
import { getMonthAbbreviation } from "@/lib/utils";

export const getClients = async (
  page: number = 1,
  pageSize: number = 10,
  searchTerm?: string,
  status?: string,
  type?: string
) => {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("all_clients_with_loans")
    .select(`*`, { count: "exact" });

  // Apply search filter
  if (searchTerm) {
    query = query.or(
      `firstName.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`
    );
  }

  // Apply status filter
  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  // Apply type filter
  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error, count } = await query.range(from, to);

  if (error || count === null) {
    return { data: [], hasMore: false, total: 0 };
  }

  return {
    data: data ?? [],
    hasMore: count > to + 1,
    total: count,
  };
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

export const getAllLoans = async (
  page: number = 1,
  pageSize: number = 10,
  searchTerm?: string,
  statusFilter?: string
) => {
  const supabase = await createClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("all_loan_applications")
    .select("*", { count: "exact" });

  // Apply search filter
  if (searchTerm) {
    query = query.or(
      `firstName.ilike.%${searchTerm}%,lastName.ilike.%${searchTerm}%`
    );
  }

  // Apply status filter
  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error, count } = await query.range(from, to);

  if (error || count === null) {
    return { data: [], hasMore: false, total: 0 };
  }

  return {
    data: data ?? [],
    hasMore: count > to + 1,
    total: count,
  };
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
    const month = getMonthAbbreviation(new Date(loan.created_at));

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
