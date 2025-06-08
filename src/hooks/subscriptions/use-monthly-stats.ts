"use client";

import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getLoanMonthlyStats } from "@/app/data";

export const key = "realtime_monthly_stats";

export const useMonthlyStats = () => {
  const swr = useSWR(key, getLoanMonthlyStats, { revalidateOnFocus: false });

  useSWRSubscription(key, (key, { next }) => {
    const channel = supabase
      .channel("realtime-monthly-stats")
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