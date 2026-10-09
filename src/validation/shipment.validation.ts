import { z } from "zod";

const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

export const createShipmentSchema = z.object({
  originZoneId: z.string().min(1, "Please select the origin zone"),

  originHubId: z.string().min(1, "Please select the origin hub"),

  destinationZoneId: z.string().min(1, "Please select the destination zone"),

  destinationHubId: z.string().min(1, "Please select the destination hub"),

  senderName: z
    .string()
    .trim()
    .min(2, "Sender name must be at least 2 characters")
    .max(100, "Sender name is too long"),

  senderPhone: z
    .string()
    .trim()
    .regex(BD_PHONE_REGEX, "Please enter a valid Bangladeshi phone number"),

  senderAddress: z
    .string()
    .trim()
    .min(5, "Sender address is required")
    .max(500, "Sender address is too long"),

  receiverName: z
    .string()
    .trim()
    .min(2, "Receiver name must be at least 2 characters")
    .max(100, "Receiver name is too long"),

  receiverPhone: z
    .string()
    .trim()
    .regex(BD_PHONE_REGEX, "Please enter a valid Bangladeshi phone number"),

  receiverAddress: z
    .string()
    .trim()
    .min(5, "Receiver address is required")
    .max(500, "Receiver address is too long"),

  weight: z
    .number()
    .positive("Weight must be greater than 0")
    .max(1000, "Weight is too high"),

  description: z
    .string()
    .trim()
    .min(2, "Package description is required")
    .max(500, "Description is too long"),

  isFragile: z.boolean(),

  pickupInstructions: z
    .string()
    .trim()
    .max(500, "Pickup instructions are too long")
    .optional(),
});

export type CreateShipmentFormValues = z.infer<typeof createShipmentSchema>;
