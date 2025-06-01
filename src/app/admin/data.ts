import { createAdminClient } from "@/lib/supabase/admin";

export const listAllAgents = async () => {
  const supabase = await createAdminClient();

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error(error.message);
    return;
  }

  const loanAgents = users.filter(
    (user) => user?.user_metadata.role === "agent"
  );

  return loanAgents;
};
