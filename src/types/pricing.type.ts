export interface IPricing {
  id: string;
  name: string;
  insideDhaka: boolean;
  base: string;
  additionalPerKg: string;
  courierEarning: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPricingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPricing[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
