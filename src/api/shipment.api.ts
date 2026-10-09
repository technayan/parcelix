import { apiClient } from "@/lib/apiClient";
import type { ICreateShipmentPayload } from "@/types";

export function createShipment(payload: ICreateShipmentPayload) {
  return apiClient("/shipments", {
    method: "POST",
    body: payload,
  });
}
