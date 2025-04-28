import { getTotalCustomers, getTransactionStats } from "@/app/actions";
import { DashboardInfoCardsClient } from "@/components/info-cards-client";

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
