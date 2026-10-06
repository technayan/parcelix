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

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
  address?: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}
