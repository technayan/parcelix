export interface ICreateShipmentPayload {
  originZoneId: string;
  originHubId: string;

  destinationZoneId: string;
  destinationHubId: string;

  senderName: string;
  senderPhone: string;
  senderAddress: string;

  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;

  weight: number;
  description: string;

  isFragile: boolean;
  pickupInstructions?: string;
}

export interface ICreateShipmentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    trackingId: string;
  };
}

export interface MyShipmentsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface MyShipment {
  id: string;
  trackingId?: string;
  courierId?: string;
  customerId: string;
  senderName: string;
  status: string;
  originZone: OriginZone;
  originHub: OriginHub;
  destinationZone: DestinationZone;
  destinationHub: DestinationHub;
}

export interface OriginZone {
  name: string;
}

export interface OriginHub {
  name: string;
}

export interface DestinationZone {
  name: string;
}

export interface DestinationHub {
  name: string;
}
