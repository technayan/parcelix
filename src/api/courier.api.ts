import { apiClient } from "@/lib/apiClient";
import type { CourierApplicationPayload, VerifyAccountPayload } from "@/types";

export function applyAsCourier(payload: CourierApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  return apiClient("/couriers", {
    method: "POST",
    body: formData,
  });
}

export function verifyCourierAccount(payload: VerifyAccountPayload) {
  return apiClient("/couriers/verify-email", {
    method: "POST",
    body: payload,
  });
}
