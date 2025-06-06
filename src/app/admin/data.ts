import { createAdminClient } from "@/lib/supabase/admin";

export const getAllAgents = async () => {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from("loan_agents").select(`*`);

  if (error) {
    console.error(error.message);
    return;
  }

  const loanAgents = data.filter((user) => user?.role === "agent");

  return loanAgents;
};
