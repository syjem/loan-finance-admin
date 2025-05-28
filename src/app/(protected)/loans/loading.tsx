import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground"></p>
        <Button variant="outline" size="sm">
          Show Less
        </Button>
      </div>

      <Table className="rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Purpose</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="cursor-pointer hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium"></TableCell>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              <div className="font-medium"></div>
            </TableCell>
            <TableCell className="capitalize hidden md:table-cell"></TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span></span>
              </div>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
