import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/supabase/session";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ProtectedRoutesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getCurrentUser();
  if (!user || (!user.isAdmin && !user.isAgent)) {
    // force logout
    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-5 dark:bg-slate-950">{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedRoutesLayout;
