export interface Hub {
  id: string;
  name: string;
  location: string;
  zoneId: string;
  isInDhaka: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface HubParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}
