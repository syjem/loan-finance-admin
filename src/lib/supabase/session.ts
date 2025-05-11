import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data.user;
};
