import { getZones } from "@/api";
import type { ZoneParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetZones(params: ZoneParams) {
  return useQuery({
    queryKey: ["zones", params],
    queryFn: () => getZones(params),
  });
}
