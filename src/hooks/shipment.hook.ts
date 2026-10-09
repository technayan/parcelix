import { createShipment } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateShipment = () => {
  return useMutation({
    mutationFn: createShipment,
  });
};
