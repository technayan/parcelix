"use client";

import { useLogin } from "@/hooks";
import { loginSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleLoginComponent from "../modules/google-login/google-login";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();

  const handleAdminLogin = () => {
    login(
      { email: "test.admin@gmail.com", password: "testAdmin@123456" },
      {
        onSuccess: () => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please, try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleCourierLogin = () => {
    login(
      { email: "ai.agent.nayan@gmail.com", password: "Nayan@123456" },
      {
        onSuccess: () => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please, try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleCustomerLogin = () => {
    login(
      { email: "nayan050620@gmail.com", password: "Nayan@123456" },
      {
        onSuccess: () => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please, try again",
            type: "error",
          });
        },
      },
    );
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: () => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please, try again",
            type: "error",
          });
        },
      });
    },
  });
  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
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
                      placeholder="Enter your email"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
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
                      placeholder="Enter your password"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
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

          <Button
            disabled={loginPending}
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
          >
            {loginPending ? (
              <>
                <Spinner /> Logging
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator className="h-1 flex items-center my-1">OR</FieldSeparator>

      <GoogleLoginComponent />

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </div>

      <div className="mt-5 p-3 border border-muted-foreground/30 rounded-lg">
        <p className="text-muted-foreground text-sm mb-3">Demo login</p>
        <div className="flex justify-between w-full">
          <Button
            onClick={handleAdminLogin}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-7 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
          >
            Admin
          </Button>
          <Button
            onClick={handleCourierLogin}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-7 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
          >
            Courier
          </Button>
          <Button
            onClick={handleCustomerLogin}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-7 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
          >
            Customer
          </Button>
        </div>
      </div>
    </div>
  );
}
