import { format } from "date-fns";
import {
  FileText,
  Mail,
  Phone,
  Calendar,
  User,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample activity data for clients
const clientActivities = {
  "1be86f6b-0b6d-4628-be80-9fa20b96e8c9": [
    {
      id: "1",
      type: "loan_application",
      description: "Submitted loan application for Business Expansion",
      date: new Date("2023-05-10"),
      user: "John Doe",
      icon: FileText,
    },
    {
      id: "2",
      type: "email",
      description: "Sent loan approval notification",
      date: new Date("2023-05-08"),
      user: "Sarah Thompson",
      icon: Mail,
    },
    {
      id: "3",
      type: "call",
      description: "Follow-up call about application requirements",
      date: new Date("2023-05-05"),
      user: "Michael Chen",
      icon: Phone,
    },
    {
      id: "4",
      type: "meeting",
      description: "Initial consultation meeting",
      date: new Date("2023-05-01"),
      user: "Sarah Thompson",
      icon: Calendar,
    },
    {
      id: "5",
      type: "note",
      description: "Updated client information and credit score",
      date: new Date("2023-04-28"),
      user: "John Doe",
      icon: User,
    },
  ],
  "2": [
    {
      id: "1",
      type: "loan_application",
      description: "Submitted loan application for Property Purchase",
      date: new Date("2023-05-08"),
      user: "John Doe",
      icon: FileText,
    },
    {
      id: "2",
      type: "email",
      description: "Requested additional documentation",
      date: new Date("2023-05-05"),
      user: "Michael Chen",
      icon: Mail,
    },
    {
      id: "3",
      type: "call",
      description: "Discussed loan terms and conditions",
      date: new Date("2023-05-03"),
      user: "Sarah Thompson",
      icon: Phone,
    },
  ],
};

export function ClientActivityTable({ clientId }: { clientId: string }) {
  const activities =
    clientActivities[clientId as keyof typeof clientActivities] || [];

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Track all interactions with this client
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <p className="text-muted-foreground">
              No recent activity found for this client.
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Date
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 data-[state=open]:bg-accent"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="sr-only">Sort</span>
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="hidden md:table-cell">User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => {
                  const Icon = activity.icon;

                  return (
                    <TableRow key={activity.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(activity.date, "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Icon className="h-4 w-4 text-foreground" />
                          </div>
                          <span>{activity.description}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {activity.user}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
