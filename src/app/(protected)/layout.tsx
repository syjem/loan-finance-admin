import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const ProtectedRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-5">{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedRoutesLayout;
