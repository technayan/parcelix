import { getOverallStatistics } from "@/api/stats.api";
import { useQuery } from "@tanstack/react-query";

export const useGetOverallStatistics = () => {
  return useQuery({
    queryKey: ["overall-statistics"],
    queryFn: getOverallStatistics,
  });
};
