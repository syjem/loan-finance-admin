"use client";

import { useSWRConfig } from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";

export const transactionStatsKey = "realtime_transactions";

export const useTransactionsRealtimeUpdate = () => {
  const { mutate } = useSWRConfig();

  useSWRSubscription("realtime_transactions", (key, { next }) => {
    const channel = supabase
      .channel("realtime-transactions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          console.log("Realtime Update:", payload.new);
          mutate(key);
          next(null, payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });
};
