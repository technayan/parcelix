import { apiClient } from "@/lib/apiClient";
import type { LoginPayload } from "@/types/auth.type";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
