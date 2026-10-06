import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please, provide a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const customerRegistrationSchema = z
  .object({
    name: z
      .string("Name must be a string")
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name cannot exceed 50 characters"),

    email: z.email("Provide a valid email"),

    password: z
      .string()
      .regex(/[A-Z]/, "Password must have atleast one uppercase character")
      .regex(/[a-z]/, "Password must have atleast one lowercase character")
      .regex(/[0-9]/, "Password must have atleast one number")
      .regex(/[^A-Za-z0-9]/, "Password must have atleast one special character")
      .min(6, "Password must be atleast 6 characters long")
      .max(100, "Password cannot exceed 100 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    phone: z
      .string("Phone must be a string")
      .trim()
      .regex(
        /^(?:\+8801|01)[3-9]\d{8}$/,
        "Please enter a valid Bangladeshi phone number",
      )
      .optional()
      .or(z.literal("")),

    address: z
      .string("Address must be a string")
      .trim()
      .min(5, "Address must be at least 5 characters long")
      .max(255, "Address cannot exceed 255 characters")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
