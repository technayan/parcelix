import {
  getAllUsers,
  getMe,
  updateProfile,
  updateProfilePhoto,
  updateUserStatus,
} from "@/api";
import type { UsersParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdateProfilePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useGetUsers(params: UsersParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: (_response) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
