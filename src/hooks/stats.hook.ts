import { getCourierStats, getOverallStatistics } from "@/api/stats.api";
import { useQuery } from "@tanstack/react-query";

export const useGetOverallStatistics = () => {
  return useQuery({
    queryKey: ["overall-statistics"],
    queryFn: getOverallStatistics,
  });
};

export const useGetCourierStatistics = () => {
  return useQuery({
    queryKey: ["courier-statistics"],
    queryFn: getCourierStats,
  });
};
