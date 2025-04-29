import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const CustomersPage = () => {
  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <h1 className="text-base md:text-lg font-[500] tracking-tight">
          Clients
        </h1>
      </header>
    </>
  );
};

export default CustomersPage;
