import {
  assignCourier,
  cancelShipment,
  createShipment,
  getAllShipments,
  getMyShipments,
  payShipment,
  requestPickup,
  shipmentDetails,
} from "@/api";
import type { AllShipmentsParams, MyShipmentsParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateShipment = () => {
  return useMutation({
    mutationFn: createShipment,
  });
};

export function useGetMyShipments(params: MyShipmentsParams) {
  return useQuery({
    queryKey: ["my-shipments", params],
    queryFn: () => getMyShipments(params),
  });
}

export const useCancelShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentId: string) => cancelShipment(shipmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-shipments"],
      });
    },
  });
};

export const usePayShipment = () => {
  return useMutation({
    mutationFn: (shipmentId: string) => payShipment(shipmentId),
  });
};

export function useShipmentDetails(shipmentId: string) {
  return useQuery({
    queryKey: ["shipment-details", shipmentId],
    queryFn: () => shipmentDetails(shipmentId),
    enabled: Boolean(shipmentId),
  });
}

export const useRequestPickup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shipmentId: string) => requestPickup(shipmentId),

    onSuccess: async (_response, shipmentId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["my-shipments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["shipment-details", shipmentId],
        }),
      ]);
    },
  });
};

export function useGetAllShipments(params: AllShipmentsParams) {
  return useQuery({
    queryKey: ["shipments", params],
    queryFn: () => getAllShipments(params),
  });
}

export const useAssignCourier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      shipmentId,
      courierId,
    }: {
      shipmentId: string;
      courierId: string;
    }) => assignCourier(shipmentId, courierId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shipments"],
      });
    },
  });
};
