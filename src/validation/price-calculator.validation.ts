import z from "zod";

export const calculatorSchema = z.object({
  area: z.enum(["inside", "outside"], {
    message: "Please select a delivery area.",
  }),
  weight: z
    .number({ error: "Enter a valid parcel weight." })
    .min(0.1, "Weight must be greater than 0 kg.")
    .max(100, "Maximum supported weight is 100 kg."),
});
