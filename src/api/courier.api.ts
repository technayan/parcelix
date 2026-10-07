import { apiClient } from "@/lib/apiClient";
import type {
  ApproveCourierPayload,
  Courier,
  CourierApplicationPayload,
  CourierParams,
  VerifyAccountPayload,
} from "@/types";
import type { ApiResponse } from "@/types/api.type";

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

export function getAllCouriers(params: CourierParams) {
  return apiClient<ApiResponse<Courier[]>>("/couriers", {
    params,
  });
}

export function approveCourier(payload: ApproveCourierPayload) {
  return apiClient("/couriers/review-courier", {
    method: "POST",
    body: payload,
  });
}
