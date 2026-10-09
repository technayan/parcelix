import { apiClient } from "@/lib/apiClient";
import type {
  ApiResponse,
  ICreateShipmentPayload,
  MyShipment,
  MyShipmentsParams,
} from "@/types";

export function createShipment(payload: ICreateShipmentPayload) {
  return apiClient("/shipments", {
    method: "POST",
    body: payload,
  });
}

export function getMyShipments(params: MyShipmentsParams) {
  return apiClient<ApiResponse<MyShipment[]>>("/shipments/my-shipments", {
    params,
  });
}

export function cancelShipment(shipmentId: string) {
  return apiClient(`/shipments/cancel/${shipmentId}`, {
    method: "PATCH",
  });
}

export function payShipment(shipmentId: string) {
  return apiClient("/shipments/pay-shipment", {
    method: "POST",
    body: { shipmentId },
  });
}
