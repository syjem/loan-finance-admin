"use client";

import useSWR from "swr";
import useSWRSubscription from "swr/subscription";
import { supabase } from "@/lib/supabase/client";
import { getLoansById } from "@/app/data";

export const useUpdateLoanStatus = (loanId: number) => {
  const swr = useSWR(
    loanId ? `loan-status-${loanId}` : null,
    () => getLoansById(loanId),
    { revalidateOnFocus: false }
  );

  useSWRSubscription(
    loanId ? `loan-status-${loanId}` : null,
    (_key, { next }) => {
      const channel = supabase
        .channel(`loan-status-${loanId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "loans",
            filter: `id=eq.${loanId}`,
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
    }
  );

  return swr;
};
