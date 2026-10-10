import { getHubs } from "@/api";
import type { HubParams } from "@/types/hub.type";
import { useQuery } from "@tanstack/react-query";

export const useGetHubs = (params: HubParams) => {
  return useQuery({
    queryKey: ["hubs", params],
    queryFn: () => getHubs(params),
  });
};
