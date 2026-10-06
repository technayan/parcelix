import { applyAsCourier, verifyCourierAccount } from "@/api/courier.api";
import { useMutation } from "@tanstack/react-query";

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
