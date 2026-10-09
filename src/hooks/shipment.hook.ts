import {
  cancelShipment,
  createShipment,
  getMyShipments,
  payShipment,
} from "@/api";
import type { MyShipmentsParams } from "@/types";
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
