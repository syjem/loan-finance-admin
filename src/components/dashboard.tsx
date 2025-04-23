import { Chart } from "react-charts";
import NewDeals from "@/components/new-deals";

import { useChart } from "@/hooks/useChart";
import { useTransactionSubscription } from "@/hooks/useTransactionSubscription";
import RecentTransactions from "@/components/recent-trasactions";

const TransactionChart = () => {
  useTransactionSubscription();
  const { chartOptions } = useChart();

  return (
    <div className="grid grid-cols-3 gap-4 m-0">
      <div className="col-span-2 w-full relative overflow-hidden flex flex-col grow-1 rounded-sm bg-white shadow-sm pt-0 px-2.5 pb-5 mx-auto my-12">
        <div className="flex justify-between items-center my-4 mx-2">
          <h2 className="font-semibold text-lg text-slate-950 m-0">
            Top 10 Deals this Quarter ($)
          </h2>
          <NewDeals />
        </div>
        <div className="flex-1">
          <Chart options={chartOptions} />
        </div>
      </div>
      <RecentTransactions />
    </div>
  );
};

export default TransactionChart;
