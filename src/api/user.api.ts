import { apiClient } from "@/lib/apiClient";
import type { UpdateProfilePayload } from "@/types";

export function getMe() {
  return apiClient("/auth/profile");
}

export function updateProfile(payload: UpdateProfilePayload) {
  return apiClient("/users/profile", { method: "PATCH", body: payload });
}

export function updateProfilePhoto(file: File) {
  const formData = new FormData();
  formData.append("profilePhoto", file);

  return apiClient("/users/profile-photo", {
    method: "PATCH",
    body: formData,
  });
}
