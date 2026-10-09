import {
  changePassword,
  googleOAuth,
  resetPassword,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
