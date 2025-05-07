import { getTotalCustomers, getTransactionStats } from "@/app/data";
import { DashboardInfoCardsClient } from "@/app/(protected)/dashboard/components/info-cards-client";

export const DashboardInfoCards = async () => {
  const numberOfCustomers = await getTotalCustomers();
  const stats = await getTransactionStats();

  return (
    <DashboardInfoCardsClient
      numberOfCustomers={numberOfCustomers}
      initialStats={stats}
    />
  );
};
