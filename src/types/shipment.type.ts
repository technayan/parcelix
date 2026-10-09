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

export interface ShipmentDetails {
  id: string;
  trackingId?: string;
  courierId?: string;
  customerId: string;
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
  weight: string;
  description: string;
  deliveryFee: string;
  isFragile: boolean;
  status: string;
  pickupDate?: string;
  deliveredAt?: string;
  returnedAt?: string;
  pickupInstructions?: string;
  returnReason?: string;
  invoiceUrl?: string;
  invoicePublicId?: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  courier: Courier;
  payment: Payment;
  originZone: OriginZone;
  originHub: OriginHub;
  destinationZone: DestinationZone;
  destinationHub: DestinationHub;
}

export interface Customer {
  id: string;
  user: User;
}

export interface Courier {
  id: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Payment {
  id: string;
  bkashTrxId?: string;
  totalAmount: string;
  status: string;
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

export interface AllShipmentsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface Shipment {
  id: string;
  trackingId: string;
  senderName: string;
  courier?: ICourier;
  originHub: OriginHub;
  destinationHub: DestinationHub;
  status: string;
}

export interface ICourier {
  user: IUser;
}

export interface IUser {
  name: string;
}
