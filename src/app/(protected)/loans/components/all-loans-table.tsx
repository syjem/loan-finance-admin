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
import { FilterableDealsTable } from "./filterable-loans-table";
import { useRouter } from "next/navigation";

export type LoanType = {
  id: number;
  amount: number;
  purpose: string;
  status: "active" | "overdue" | "completed";
  created_at: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

interface LoansResponse {
  data: LoanType[];
  hasMore: boolean;
  total: number;
}

const AllLoansTable = ({
  loans,
  query,
  status,
}: {
  loans: LoansResponse;
  query: string;
  status: string;
}) => {
  const [searchTerm, setSearchTerm] = useState(query);
  const [statusFilter, setStatusFilter] = useState(status);
  const router = useRouter();

  const handleSearchClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const search = new URLSearchParams(window.location.search);

    if (value.trim() === "") {
      search.delete("query");
    } else {
      search.set("query", value);
    }

    const queryString = search.toString();
    router.push(`/loans${queryString ? `?${queryString}` : ""}`);
  };

  const handleChangeFilter = (value: string) => {
    setStatusFilter(value);

    const search = new URLSearchParams(window.location.search);
    if (value === "all") {
      search.delete("status");
    } else {
      search.set("status", value);
    }

    // Preserve existing `query` param (if any)
    const query = search.toString();
    router.push(`/loans${query ? `?${query}` : ""}`);
  };

  const handleClearFilters = () => {
    const search = new URLSearchParams(window.location.search);
    search.delete("query");
    search.delete("status");
    setSearchTerm("");
    setStatusFilter("all");

    router.push(`/loans`);
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
                Search by Client&apos;s Name
              </Label>
              <div className="relative md:max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search client names..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearchClient}
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
          <FilterableDealsTable
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            loans={loans.data}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AllLoansTable;
