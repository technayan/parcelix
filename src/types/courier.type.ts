export interface CourierApplicationData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CourierApplicationPayload {
  resume: File;
  data: CourierApplicationData;
}

export interface CourierParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  availabilityStatus?: "AVAILABLE" | "BUSY";
  verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}

export interface Courier {
  id: string;
  address?: string;
  availabilityStatus: "AVAILABLE" | "BUSY";
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  resume?: "string";
  createdAt: "string";
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
}

export interface ApproveCourierPayload {
  courierId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export type CourierStatus = "PENDING" | "APPROVED" | "REJECTED";
