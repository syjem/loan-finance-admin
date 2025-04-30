import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RecentTransactionSkeleton = () => {
  return (
    <Card className="shadow-md border bg-muted/50">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionSkeleton;
