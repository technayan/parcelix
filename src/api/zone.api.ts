import { apiClient } from "@/lib/apiClient";
import type { Zone, ZoneParams } from "@/types";
import type { ApiResponse } from "@/types/api.type";

export function getZones(params: ZoneParams) {
  return apiClient<ApiResponse<Zone[]>>("/zones", {
    params,
  });
}
