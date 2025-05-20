import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientStats } from "@/app/(protected)/clients/components/client-stats";
import { ClientsTable } from "@/app/(protected)/clients/components/clients-table";

export const metadata: Metadata = {
  title: "Client Management",
  description: "Manage client information and loan history",
};

const ClientsPage = async () => {
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-sm font-medium tracking-tight">
            Client Management
          </h1>
        </div>
        <Button asChild>
          <Link href="/clients/new">Add Client</Link>
        </Button>
      </header>
      <div className="container space-y-6">
        <ClientStats />
        <ClientsTable />
      </div>
    </>
  );
};

export default ClientsPage;
