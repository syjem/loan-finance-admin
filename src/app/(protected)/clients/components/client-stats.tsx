import { Users, TrendingUp, Building, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClientStats({
  totalNumberOfClients,
  activeBorrowers,
  businessClients,
  totalClientsThisMonth,
}: {
  totalNumberOfClients: number;
  activeBorrowers: number;
  businessClients: number;
  totalClientsThisMonth: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-muted/50 gap-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-base md:text-xl font-bold">
            {totalNumberOfClients}
          </div>
          <p className="text-xs text-muted-foreground">
            +{totalClientsThisMonth} this month
          </p>
        </CardContent>
      </Card>
      <Card className="bg-muted/50 gap-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Active Borrowers
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-base md:text-xl font-bold">
            {activeBorrowers}
          </div>
          <p className="text-xs text-muted-foreground">
            {((activeBorrowers / totalNumberOfClients) * 100).toFixed(0)}% of
            total clients
          </p>
        </CardContent>
      </Card>
      <Card className="bg-muted/50 gap-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Business Clients
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-base md:text-xl font-bold">
            {businessClients}
          </div>
          <p className="text-xs text-muted-foreground">
            {((businessClients / totalNumberOfClients) * 100).toFixed(0)}% of
            total clients
          </p>
        </CardContent>
      </Card>
      <Card className="bg-muted/50 gap-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Avg. Loans per Client
          </CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-base md:text-xl font-bold">1.8</div>
          <p className="text-xs text-muted-foreground">+0.3 from last year</p>
        </CardContent>
      </Card>
    </div>
  );
}
