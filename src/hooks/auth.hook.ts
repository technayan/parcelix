import { getMe, googleOAuth, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["user"] });
    // },
  });
}

export function useGoogleOAuth() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleOAuth,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["user"] });
    // },
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useLogout() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    // onSuccess: () => {
    //   queryClient.setQueryData(["user"], null);
    //   queryClient.removeQueries({
    //     predicate: (query) => query.queryKey[0] !== "user",
    //   });
    // },
  });
}
