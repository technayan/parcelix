import { apiClient } from "@/lib/apiClient";
import type {
  LoginPayload,
  RegistrationPayload,
  UpdateProfilePayload,
  VerifyAccountPayload,
} from "@/types/auth.type";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function userRegistration(payload: RegistrationPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient("/auth/email-verification", {
    method: "POST",
    body: payload,
  });
}

export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}

export function getMe() {
  return apiClient("/auth/profile");
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function updateProfile(payload: UpdateProfilePayload) {
  return apiClient("/users/profile", { method: "PATCH", body: payload });
}
