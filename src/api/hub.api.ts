import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.type";
import type { Hub, HubParams } from "@/types/hub.type";

export function getHubs(params: HubParams) {
  return apiClient<ApiResponse<Hub[]>>("/hubs", {
    params,
  });
}
