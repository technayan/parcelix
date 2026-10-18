"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegistration } from "@/hooks";
import { customerRegistrationSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type z from "zod";
import GoogleLoginComponent from "../modules/google-login/google-login";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  type CustomerDefaultValues = z.infer<typeof customerRegistrationSchema>;

  const { mutate: registration, isPending: registrationPending } =
    useRegistration();

  const defaultValues: CustomerDefaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: customerRegistrationSchema,
    },
    onSubmit: async ({ value }) => {
      const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
        phone: value.phone,
        address: value.address,
      };

      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });
          }

          toast.add({
            title: "Registration Successful",
            description: "Please verify your account",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter full name"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="name"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="Enter valid email"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      placeholder="Enter Bangladeshi phone no."
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Retype your password"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-4.5 size-4.25 -translate-y-1/2 text-slate-400" />
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Enter address"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="address"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            disabled={registrationPending}
            type="submit"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
          >
            {registrationPending ? (
              <>
                <Spinner /> Registering
              </>
            ) : (
              "Register"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator className="h-1 flex items-center my-1">OR</FieldSeparator>

      <GoogleLoginComponent />

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
