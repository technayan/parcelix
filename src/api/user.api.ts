import { apiClient } from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api.type";
import type { UpdateProfilePayload } from "@/types/auth.type";
import type {
  TUser,
  UpdateUserStatusPayload,
  UsersParams,
} from "@/types/user.type";

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

export function getAllUsers(params: UsersParams) {
  return apiClient<ApiResponse<TUser[]>>("/users", {
    params,
  });
}

export function updateUserStatus(payload: UpdateUserStatusPayload) {
  return apiClient(`/users/update-status/${payload.userId}`, {
    method: "PATCH",
    body: { status: payload.status },
  });
}
