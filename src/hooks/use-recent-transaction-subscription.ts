"use client";

import { useSWRConfig } from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";

export const useRecentTransactionSubscription = () => {
  const { mutate } = useSWRConfig();

  useSWRSubscription("recent_transactions", (key, { next }) => {
    const channel = supabase
      .channel("recent-transaction")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          console.log("Change received:", payload.new);
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
