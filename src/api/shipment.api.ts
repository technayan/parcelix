import { apiClient } from "@/lib/apiClient";
import type {
  ApiResponse,
  ICreateShipmentPayload,
  MyShipment,
  MyShipmentsParams,
  Shipment,
} from "@/types";
import type { AllShipmentsParams } from "../types/shipment.type";

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

export function shipmentDetails(shipmentId: string) {
  return apiClient(`/shipments/details/${shipmentId}`);
}

export function requestPickup(shipmentId: string) {
  return apiClient("/shipments/request-pickup", {
    method: "PATCH",
    body: { shipmentId },
  });
}

export function getAllShipments(params: AllShipmentsParams) {
  return apiClient<ApiResponse<Shipment[]>>("/shipments", {
    params,
  });
}

export function assignCourier(shipmentId: string, courierId: string) {
  return apiClient(`/shipments/assign-courier/${shipmentId}`, {
    method: "PATCH",
    body: { courierId },
  });
}
