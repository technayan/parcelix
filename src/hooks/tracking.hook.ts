import { getTracking } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useGetTracking() {
  return useMutation({
    mutationFn: (trackingId: string) => getTracking(trackingId),
  });
}
