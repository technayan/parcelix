import { apiClient } from "@/lib/apiClient";
import type {
  ICourierStatisticsResponse,
  IOverallStatisticsResponse,
} from "@/types/stats.type";

export const getOverallStatistics = async () => {
  return apiClient<IOverallStatisticsResponse>("/stats", {
    method: "GET",
  });
};

export const getCourierStats = async () => {
  return apiClient<ICourierStatisticsResponse>("/couriers/stats", {
    method: "GET",
  });
};
