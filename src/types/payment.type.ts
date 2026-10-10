export interface MyPaymentsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface PaymentInfo {
  id: string;
  bkashTrxId: string;
  paidAt: string;
  totalAmount: string;
  currency: string;
  refundAmount?: number;
  refundedAt?: string;
  refundReason?: string;
  status: string;
}
