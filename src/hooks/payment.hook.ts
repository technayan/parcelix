import { getMyTransactions } from "@/api/payment.api";
import type { MyPaymentsParams } from "@/types/payment.type";
import { useQuery } from "@tanstack/react-query";

export function useGetMyTransactions(params: MyPaymentsParams) {
  return useQuery({
    queryKey: ["my-transactions", params],
    queryFn: () => getMyTransactions(params),
  });
}
