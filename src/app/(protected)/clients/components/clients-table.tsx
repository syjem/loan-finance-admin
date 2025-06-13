"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CLientType } from "@/lib/types";
import DataTable from "./data-table";
import { useDebouncedCallback } from "use-debounce";

type ClientsTableProps = {
  clients: {
    data: CLientType[];
    hasMore: boolean;
    total: number;
  };
  q: string;
  status: string;
  type: string;
  page: number;
};

export function ClientsTable({
  clients,
  q,
  status,
  type,
  page,
}: ClientsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(q);
  const [statusFilter, setStatusFilter] = useState(status);
  const [typeFilter, setTypeFilter] = useState(type);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    if (value.trim() === "") {
      params.delete("q");
    } else {
      params.set("q", value);
    }

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchQuery(value);
  };

  const handleChangeStatusFilter = (value: string) => {
    setStatusFilter(value);

    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const handleChangeTypeFilter = (value: string) => {
    setTypeFilter(value);

    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <Card className="bg-muted/50">
      <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <CardTitle>
          <span className="sr-only">Clients</span>
        </CardTitle>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <Select
              value={statusFilter}
              onValueChange={handleChangeStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={handleChangeTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          q={searchTerm}
          status={statusFilter}
          type={typeFilter}
          page={page}
          clients={clients}
        />
      </CardContent>
    </Card>
  );
}
