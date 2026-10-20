"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useUpdateProfile } from "@/hooks";
import type { UpdateProfileFormProps } from "@/types/profile.type";
import { updateProfileSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import type z from "zod";

export function UpdateProfileForm({
  user,
  onComplete,
}: UpdateProfileFormProps) {
  type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

  const { mutate: updateProfile, isPending: updateProfilePending } =
    useUpdateProfile();

  const defaultValues: UpdateProfileValues = {
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
  };

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: updateProfileSchema,
    },

    onSubmit: async ({ value }) => {
      console.log(value);
      updateProfile(value, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Update Failed",
              description:
                res.message || "Something went wrong. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
            type: "success",
          });
        },

        onError: (err) => {
          toast.add({
            title: "Update Failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
        onSettled: () => {
          onComplete?.();
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
          {/* Full Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                  <div className="relative flex items-center">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter full name"
                      className="h-11 rounded-md border-slate-200 bg-slate-50/70 pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
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

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4.25 -translate-y-1/2 text-slate-400" />

              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="h-11 rounded-md border-slate-200 bg-muted pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Email address cannot be changed here.
            </p>
          </Field>

          {/* Phone */}
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
                      className="h-11 rounded-md border-slate-200 bg-muted pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="tel"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Address */}
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
                      placeholder="Enter your address"
                      className="h-11 rounded-md border-slate-200 bg-muted pl-10 text-sm focus-visible:border-[#F97316] focus-visible:ring-[#F97316]/20 dark:border-white/10 dark:bg-white/[0.035]"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="street-address"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            disabled={updateProfilePending}
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 cursor-pointer"
          >
            {updateProfilePending ? (
              <>
                <Spinner />
                Updating
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
