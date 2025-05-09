import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { getClientsTotalValue } from "@/app/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Clients",
};

const ClientsPage = async () => {
  const clients = await getClientsTotalValue();
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-sm font-medium tracking-tight">Clients</h1>
        </div>
        <Button>New</Button>
      </header>
      <div className="container">
        <DataTable columns={columns} data={clients ?? []} />
      </div>
    </>
  );
};

export default ClientsPage;
