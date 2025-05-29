import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Filter, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="container space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 h-4 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-2 -ml-1 border" />
          <h1 className="text-base font-medium tracking-tight">
            Loan Applications
          </h1>
        </div>
        <Button>New Application</Button>
      </header>
      <div className="space-y-4">
        <Card className="mb-4 bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Search and filter loan applications
            </CardDescription>
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
                  <Select>
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
                <Button variant="outline">Clear Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="rounded-md">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Purpose
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => {
                  const badgeColors = [
                    "w-20 bg-purple-100 dark:bg-purple-900",
                    "w-24 bg-yellow-100 dark:bg-yellow-900",
                    "w-28 bg-green-100 dark:bg-green-900",
                  ];

                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="w-28 h-4" />
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="" alt="" />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <Skeleton className="w-28 h-4" />
                      </TableCell>
                      <TableCell>
                        <div>
                          <Skeleton className="w-28 h-4" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="w-32 h-4" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>
                            <Skeleton className="w-32 h-4" />
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          className={cn(
                            "h-4 rounded-full",
                            badgeColors[i % badgeColors.length]
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
