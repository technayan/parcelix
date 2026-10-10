import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.type";
import type { PaymentInfo } from "@/types/payment.type";
import type { MyShipmentsParams } from "@/types/shipment.type";

export function getMyTransactions(params: MyShipmentsParams) {
  return apiClient<ApiResponse<PaymentInfo[]>>("/payments/my-payments", {
    params,
  });
}
