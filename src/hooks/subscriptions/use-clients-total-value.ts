"use client";

import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getClientsTotalValue } from "@/app/data";

export const key = "clients_total_value";

export const useClientsTotalValue = () => {
  const swr = useSWR(key, getClientsTotalValue, { revalidateOnFocus: false });

  useSWRSubscription(key, (key, { next }) => {
    const channel = supabase
      .channel("realtime-clients-total-value")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "loans",
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
