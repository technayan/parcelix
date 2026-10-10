import { apiClient } from "@/lib/apiClient";
import type { IOverallStatisticsResponse } from "@/types/stats.type";

export const getOverallStatistics = async () => {
  return apiClient<IOverallStatisticsResponse>("/stats", {
    method: "GET",
  });
};
