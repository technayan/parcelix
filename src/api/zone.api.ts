import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.type";
import type { Zone, ZoneParams } from "@/types/zone.type";

export function getZones(params: ZoneParams) {
  return apiClient<ApiResponse<Zone[]>>("/zones", {
    params,
  });
}
