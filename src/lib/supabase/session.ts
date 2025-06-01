import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Error fetching user:", error?.message || "No user");
    return null;
  }

  const user = data.user;

  const isAdmin = user.user_metadata?.role === "admin";
  const isAgent = user.user_metadata?.role === "agent";

  return {
    ...user,
    isAdmin,
    isAgent,
  };
};
