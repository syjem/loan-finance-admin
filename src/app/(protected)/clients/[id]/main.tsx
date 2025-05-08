import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Ban, Check, Clock3 } from "lucide-react";

type Client = {
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

type Transaction = {
  id: number;
  created_at: string;
  customer_id: string;
  value: number;
  purpose: string;
  status: "pending" | "rejected" | "approved";
};

export const Main = ({
  client,
  transaction,
}: {
  client: Client[];
  transaction: Transaction[];
}) => {
  return (
    <main className="container py-4 md:py-8">
      <ClientInformation client={client} />
      <ClientTransaction transaction={transaction} />
    </main>
  );
};

const ClientInformation = ({ client }: { client: Client[] }) => {
  return (
    <>
      {client?.map((client: Client) => (
        <div
          key={client.id}
          className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16"
        >
          <div className="space-y-4">
            <div className="flex gap-4">
              <Image
                src={client.avatar}
                alt={client.name}
                width={80}
                height={80}
                priority
                className="rounded-md size-20"
              />
              <div>
                <Badge className="capitalize font-medium">
                  {client.status}
                </Badge>
                <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl my-2">
                  {client.name}
                </h2>
                <address className="text-muted-foreground font-semibold text-sm">
                  {client.email}
                </address>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm">{client.bio}</p>
          </div>
          <div className="space-y-4">
            <dl>
              <dt className="font-semibold text-accent-foreground">
                Phone Number
              </dt>
              <dd>
                <address className="text-muted-foreground font-semibold text-sm">
                  +{client.phone}
                </address>
              </dd>
            </dl>
            <dl>
              <dt className="font-semibold text-accent-foreground">Addess</dt>
              <dd>
                <address className="text-muted-foreground font-semibold text-sm">
                  {client.address}
                </address>
              </dd>
            </dl>
            <dl>
              <dt className="font-semibold text-accent-foreground">
                Joined at
              </dt>
              <dd>
                <span className="text-muted-foreground font-semibold text-sm">
                  {formatDate(client.created_at)}
                </span>
              </dd>
            </dl>
          </div>
        </div>
      ))}
    </>
  );
};

const ClientTransaction = ({ transaction }: { transaction: Transaction[] }) => {
  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
      <h3 className="pb-4 text-xl font-semibold text-gray-900 dark:text-white border-b">
        Recent Transactions
      </h3>
      {transaction.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex flex-wrap items-center gap-y-4 last:border-b-0 pb-4 dark:border-gray-700 md:py-5",
            transaction.length !== 1 && "border-b"
          )}
        >
          <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Created at
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
              {formatDate(t.created_at)}
            </dd>
          </dl>
          <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Purpose
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
              {t.purpose}
            </dd>
          </dl>
          <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Value
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
              {formatCurrency(t.value)}
            </dd>
          </dl>
          <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
              Status
            </dt>
            <TransactionStatus status={t.status} />
          </dl>
        </div>
      ))}
    </div>
  );
};

const TransactionStatus = ({ status }: { status: Transaction["status"] }) => {
  return status === "pending" ? (
    <dd className="capitalize not-first:me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
      <Clock3 className="mr-2 size-3" />
      {status}
    </dd>
  ) : status === "rejected" ? (
    <dd className="capitalize not-first:mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
      <Ban className="mr-2 size-3" />
      {status}
    </dd>
  ) : status === "approved" ? (
    <dd className="capitalize not-first:mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
      <Check className="mr-2 size-3" />
      {status}
    </dd>
  ) : null;
};
