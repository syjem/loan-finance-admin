"use client";

import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getRecentLoanApplications } from "@/app/data";

export const key = "recent_loan_applications";

export const useRecentLoanApplications = () => {
  const swr = useSWR(key, getRecentLoanApplications, {
    revalidateOnFocus: false,
  });

  useSWRSubscription(key, (key, { next }) => {
    const channel = supabase
      .channel("realtime-recent-loan-applications")
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
