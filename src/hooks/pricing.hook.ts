import { getPricings } from "@/api/pricing.api";
import { useQuery } from "@tanstack/react-query";

export const useGetPricings = () => {
  return useQuery({
    queryKey: ["pricings"],
    queryFn: getPricings,
  });
};
