import { apiClient } from "@/lib/apiClient";
import type { ApiResponse, Hub, HubParams } from "@/types";

export function getHubs(params: HubParams) {
  return apiClient<ApiResponse<Hub[]>>("/hubs", {
    params,
  });
}
