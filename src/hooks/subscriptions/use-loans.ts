import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getAllLoans } from "@/app/data";

export const key = "loans";

export const useLoans = (page: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    [key, page],
    () => getAllLoans(page),
    {
      revalidateOnFocus: false,
    }
  );

  useSWRSubscription(key, (key, { next }) => {
    const channel = supabase
      .channel("realtime-loans")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "all_loan_applications",
        },
        (payload) => {
          mutate();
          next(null, payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  });

  return {
    data,
    error,
    isLoading,
    hasMore: data?.hasMore,
  };
}; 