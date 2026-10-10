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

export interface ICourierStatisticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IOverallStatistics;
}

export interface ICourierStatistics {
  totalEarnings: string;
  totalCompletedShipments: number;
}
