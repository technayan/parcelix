export interface ITrackingEvent {
  id: string;
  shipmentId: string;
  status: string;
  createdAt: string;
}

export interface ITrackingResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITrackingEvent[];
}
