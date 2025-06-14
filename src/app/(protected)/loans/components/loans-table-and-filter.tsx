"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export type LoanType = {
  id: number;
  amount: number;
  purpose: string;
  status: "active" | "overdue" | "completed";
  created_at: string;
  firstName: string;
  lastName: string;
  avatar: string;
}[];

const LoansTableAndFilter = ({
  loans,
  query,
  status,
  page,
  hasMore,
  total,
}: {
  loans: LoanType;
  query: string;
  status: string;
  page: number;
  hasMore: boolean;
  total: number;
}) => {
  const [searchTerm, setSearchTerm] = useState(query);
  const [statusFilter, setStatusFilter] = useState(status);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    if (value.trim() === "") {
      params.delete("query");
    } else {
      params.set("query", value);
    }

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchQuery(value);
  };

  const handleChangeFilter = (value: string) => {
    setStatusFilter(value);

    const params = new URLSearchParams(searchParams);

    params.delete("page");

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("status");
    setSearchTerm("");
    setStatusFilter("all");

    const pageNumber = Number(params.get("page") || 1);

    router.push(`${pathname}?${pageNumber > 1 ? `page=${pageNumber}` : ""}`);
  };

  return (
    <>
      <Card className="mb-4 bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Search and filter loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <Label
                htmlFor="search"
                className="text-sm font-medium mb-2 block"
              >
                Search by client&apos;s name
              </Label>
              <div className="relative md:max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search client names..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <div>
                <Label
                  htmlFor="status-filter"
                  className="text-sm font-medium mb-2 block"
                >
                  Filter by Status
                </Label>
                <Select value={statusFilter} onValueChange={handleChangeFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            loans={loans}
            page={page}
            hasMore={hasMore}
            total={total}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default LoansTableAndFilter;
