import { getMe, updateProfile, updateProfilePhoto } from "@/api";
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
