import {
  applyAsCourier,
  approveCourier,
  getAllCouriers,
  verifyCourierAccount,
} from "@/api";
import type { CourierParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApplyAsCourier() {
  return useMutation({
    mutationFn: applyAsCourier,
  });
}

export function useVerifyCourierAccount() {
  return useMutation({
    mutationFn: verifyCourierAccount,
  });
}

export function useGetCouriers(params: CourierParams) {
  return useQuery({
    queryKey: ["couriers", params],
    queryFn: () => getAllCouriers(params),
  });
}

export function useReviewCourier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveCourier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["couriers"] });
    },
  });
}
