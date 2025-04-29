"use client";

import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getRecentTransactions } from "@/app/supabase-queries";

export const key = "recent_transactions";

export const useRecentTransactions = () => {
  const swr = useSWR(key, getRecentTransactions, { revalidateOnFocus: false });

  useSWRSubscription(key, (key, { next }) => {
    const channel = supabase
      .channel("recent-transactions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          swr.mutate();
          next(null, payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  return swr;
};
