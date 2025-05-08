import React from "react";
import NewDeals from "@/app/(protected)/dashboard/components/new-deal";

const ChartHeader = () => {
  return (
    <div className="flex justify-between items-center my-2 mx-4">
      <h3 className="font-semibold text-lg text-slate-950 dark:text-slate-50 m-0">
        Clients Overview
      </h3>
      <NewDeals />
    </div>
  );
};

export default ChartHeader;
