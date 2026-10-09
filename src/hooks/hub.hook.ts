import { getHubs } from "@/api";
import type { HubParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetHubs = (params: HubParams) => {
  return useQuery({
    queryKey: ["hubs", params],
    queryFn: () => getHubs(params),
  });
};
