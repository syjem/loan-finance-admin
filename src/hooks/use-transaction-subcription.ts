"use client";

import { useSWRConfig } from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";

export const useTransactionSubscription = () => {
  const { mutate } = useSWRConfig();

  useSWRSubscription("transactions", (key, { next }) => {
    const channel = supabase
      .channel("deal-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
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
