import { apiClient } from "@/lib/apiClient";
import type { LoginPayload } from "@/types/auth.type";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
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
