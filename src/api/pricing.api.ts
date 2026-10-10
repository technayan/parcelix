import { apiClient } from "@/lib/apiClient";
import type { IPricingsResponse } from "@/types/pricing.type";

export const getPricings = async () => {
  return apiClient<IPricingsResponse>("/pricings", {
    method: "GET",
  });
};
