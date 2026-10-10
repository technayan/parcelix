import { apiClient } from "@/lib/apiClient";

export function getTracking(trackingId: string) {
  return apiClient(`/trackings/${trackingId}`);
}
