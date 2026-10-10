export interface IOverallStatistics {
  totalEarnings: string;
  totalCompletedShipments: number;
  totalCouriers: number;
  totalCustomers: number;
}

export interface IOverallStatisticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IOverallStatistics;
}
