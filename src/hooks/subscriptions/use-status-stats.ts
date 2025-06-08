"use client";

import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getLoanStatusPercentage } from "@/app/data";

export const key = "realtime_status_stats";

export const useStatusStats = () => {
  const swr = useSWR(key, getLoanStatusPercentage, { revalidateOnFocus: false });

  useSWRSubscription(key, (key, { next }) => {
    const channel = supabase
      .channel("realtime-status-stats")
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