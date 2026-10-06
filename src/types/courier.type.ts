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
