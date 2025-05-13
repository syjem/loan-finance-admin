import { getClientById, getClientTransactionById } from "@/app/data";
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
import { Main } from "./main";
import { Metadata } from "next";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const id = (await params).id;
  const client = await getClientById(id);

  return {
    title: client
      ? `Clients ~ ${client.map((client: Client) => client.name)}`
      : "Client Not Found",
  };
}

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
  const [client, transaction] = await Promise.all([
    getClientById(id),
    getClientTransactionById(id),
  ]);

  return (
    <>
      <header className="flex h-4 shrink-0 items-center gap-2 mb-4">
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
                {client !== null
                  ? client.map((client: Client) => client.name)
                  : id}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Main client={client ?? []} transaction={transaction ?? []} />
    </>
  );
};

export default ClientProfilePage;
