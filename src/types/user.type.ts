export type UserRole = "ADMIN" | "COURIER" | "CUSTOMER";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  profilePhoto?: string | null;
  role: UserRole;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  emailVerified: boolean;
  createdAt: string;
  customer: Customer | null;
  courier: Courier | null;
}

interface Customer {
  id: string;
  userId: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

interface Courier {
  id: string;
  userId: string;
  address?: string;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  availabilityStatus: "AVAILABLE" | "UNAVAILABLE";
  resume?: string;
  resumePublicId?: string;
  rejectionReason: string;
  reviewedAt: string;
  createdAt: string;
  updatedAt: string;
}
