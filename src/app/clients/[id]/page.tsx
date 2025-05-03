import { getClientById } from "@/app/supabase-queries";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export type Client = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "blacklisted";
  bio: string;
};

const ClientProfilePage = async ({ params }: ParamsType) => {
  const id = (await params).id;
  const data = await getClientById(id);
  const clientName =
    data !== null ? data.map((client: Client) => client.name) : id;

  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-2 -ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/clients">Clients</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                {clientName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </>
  );
};

export default ClientProfilePage;
