import { useRecentTransactions } from "@/hooks/useRecentTransactions";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

type Transaction = {
  name: string;
  email: string;
  avatar: string;
  value: number;
  title: string;
};

const RecentTransactions = () => {
  const { recent_transactions: recent } = useRecentTransactions();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {recent?.map((item: Transaction) => (
            <TooltipProvider>
              <Tooltip key={item.email}>
                <TooltipTrigger>
                  <li className="flex items-center justify-between hover:bg-emerald-50 py-2 px-4 rounded-md">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback className="text-xs">
                          {getInitials(item.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-start">
                          {item.name}
                        </span>
                        <span className="text-muted-foreground">
                          {item.email}
                        </span>
                      </div>
                    </div>

                    <span>{formatCurrency(item.value)}</span>
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex gap-2 items-center text-muted-foreground">
        <RefreshCw className="size-5" />
        <p> Updated just now</p>
      </CardFooter>
    </Card>
  );
};

export default RecentTransactions;
