export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}
