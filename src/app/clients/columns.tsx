"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

export type Clients = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  total_value: number;
  transaction_count: number;
  created_at: string;
  bio: string;
};

export const columns: ColumnDef<Clients>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Link
              href={`clients/${client.id}`}
              className="flex items-center gap-4 group"
            >
              <Avatar>
                <AvatarImage src={client.avatar}></AvatarImage>
                <AvatarFallback className="text-xs">
                  {getInitials(client.name)}
                </AvatarFallback>
              </Avatar>
              <span className="font-bold group-hover:underline">
                {client.name}
              </span>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src={client.avatar} />
                <AvatarFallback className="text-xs">
                  {getInitials(client.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-bold">{client.name}</h4>
                <p className="text-sm">{client.bio}</p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined {formatDate(client.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "transaction_count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transactions
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;

      return <div className="pl-14">{client.transaction_count}</div>;
    },
  },
  {
    accessorKey: "total_value",
    header: ({ column }) => {
      return (
        <Button
          className="w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_value"));
      const formatted = formatCurrency(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.id)}
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`clients/${client.id}`}>View client</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
