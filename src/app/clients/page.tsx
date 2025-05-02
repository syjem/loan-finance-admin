import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { getClientsTotalValue } from "@/app/supabase-queries";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const ClientsPage = async () => {
  const clients = await getClientsTotalValue();
  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <h1 className="text-base md:text-lg font-[500] tracking-tight">
          Clients
        </h1>
      </header>
      <div className="container py-6">
        <DataTable columns={columns} data={clients ?? []} />
      </div>
    </>
  );
};

export default ClientsPage;
