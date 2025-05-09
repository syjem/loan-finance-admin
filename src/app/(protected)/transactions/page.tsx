import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

const TransactionsPage = () => {
  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <h1 className="text-sm font-medium tracking-tight">Transactions</h1>
      </header>
    </>
  );
};

export default TransactionsPage;
