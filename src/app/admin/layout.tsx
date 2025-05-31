import { getCurrentUser } from "@/lib/supabase/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
