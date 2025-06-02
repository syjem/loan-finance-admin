import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientStats } from "@/app/(protected)/clients/components/client-stats";
import { ClientsTable } from "@/app/(protected)/clients/components/clients-table";
import {
  getActiveBorrowers,
  getClients,
  getTotalNumberOfClients,
  getBusinessClients,
  getClientsThisMonth,
} from "@/app/data";

export const metadata: Metadata = {
  title: "Client Management",
  description: "Manage client information and loan history",
};

const ClientsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; status: string; type: string }>;
}) => {
  const [
    clients,
    totalNumberOfClients,
    totalActiveBorrowers,
    totalBusinessClients,
    totalClientsThisMonth,
  ] = await Promise.all([
    getClients(),
    getTotalNumberOfClients(),
    getActiveBorrowers(),
    getBusinessClients(),
    getClientsThisMonth(),
  ]);

  const q = (await searchParams).q || "";
  const status = (await searchParams).status || "all";
  const type = (await searchParams).type || "all";

  return (
    <div className="container space-y-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-base font-medium tracking-tight">
            Client Management
          </h1>
        </div>
        <Button asChild>
          <Link href="/clients/new">Add Client</Link>
        </Button>
      </header>
      <div className="container space-y-6">
        <ClientStats
          totalNumberOfClients={totalNumberOfClients}
          activeBorrowers={totalActiveBorrowers}
          businessClients={totalBusinessClients}
          totalClientsThisMonth={totalClientsThisMonth}
        />
        <ClientsTable clients={clients} q={q} status={status} type={type} />
      </div>
    </div>
  );
};

export default ClientsPage;
