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
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Profile Information
        </h2>

        <p className="text-sm text-muted-foreground">
          Update your personal information and contact details.
        </p>
      </div>

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

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Enter full name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>

            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted"
            />

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

                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="Enter Bangladeshi phone no."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="tel"
                  />

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

                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your address"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="street-address"
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            disabled={updateProfilePending}
            type="submit"
            className="hover:bg-secondary"
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
