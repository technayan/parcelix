"use client";

import { useResetPassword } from "@/hooks";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { toast } from "../ui/toast";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpInvalid, setOtpInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  if (!email) {
    router.push("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    // Validate OTP
    if (otp.length !== 6) {
      setOtpInvalid(true);
      hasError = true;
    }

    // Validate password
    if (newPassword.length < 8) {
      setPasswordInvalid(true);
      hasError = true;
    }

    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordInvalid(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const resetPasswordData = {
      email,
      otp,
      newPassword,
    };

    resetPassword(resetPasswordData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Reset Password Failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Password Reset Successful",
          description:
            "Your password has been reset successfully. Please login.",
          type: "success",
        });

        router.push("/login");
      },

      onError: (err) => {
        toast.add({
          title: "Reset Password Failed",
          description: err.message || "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>

        <CardDescription>
          Enter the OTP sent to your email and create a new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* OTP */}
          <Field data-invalid={otpInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>

            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);

                if (otpInvalid) {
                  setOtpInvalid(false);
                }
              }}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                />
                <InputOTPSlot
                  index={1}
                  className="border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                />
                <InputOTPSlot
                  index={2}
                  className="border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                />
                <InputOTPSlot
                  index={3}
                  className="border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                />
                <InputOTPSlot
                  index={4}
                  className="border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                />
                <InputOTPSlot
                  index={5}
                  className="border-slate-200 bg-slate-50/70 focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                />
              </InputOTPGroup>
            </InputOTP>

            {otpInvalid && (
              <FieldError
                errors={[
                  {
                    message: "Please enter the 6-digit OTP.",
                  },
                ]}
              />
            )}
          </Field>

          {/* New Password */}
          <Field data-invalid={passwordInvalid}>
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);

                  if (passwordInvalid) {
                    setPasswordInvalid(false);
                  }

                  if (
                    confirmPasswordInvalid &&
                    e.target.value === confirmPassword
                  ) {
                    setConfirmPasswordInvalid(false);
                  }
                }}
                autoComplete="new-password"
                className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                aria-invalid={passwordInvalid}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {passwordInvalid && (
              <FieldError
                errors={[
                  {
                    message: "Password must be at least 8 characters.",
                  },
                ]}
              />
            )}
          </Field>

          {/* Confirm New Password */}
          <Field data-invalid={confirmPasswordInvalid}>
            <FieldLabel htmlFor="confirmPassword">
              Confirm New Password
            </FieldLabel>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Retype new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);

                  if (confirmPasswordInvalid) {
                    setConfirmPasswordInvalid(false);
                  }
                }}
                autoComplete="new-password"
                className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                aria-invalid={confirmPasswordInvalid}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            {confirmPasswordInvalid && (
              <FieldError
                errors={[
                  {
                    message: "Passwords do not match.",
                  },
                ]}
              />
            )}
          </Field>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="reset-password-form"
          disabled={isPending}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
        >
          {isPending ? "Resetting Password..." : "Reset Password"}
        </Button>
      </CardFooter>
    </Card>
  );
}
