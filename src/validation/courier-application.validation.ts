import z from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const getCustomFileSchema = <T>(message: string) =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message: message,
    },
  );

export const courierApplicationSchema = z.object({
  name: z
    .string("Name must be a string")
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.email("Provide a valid email"),

  phone: z
    .string("Phone must be a string")
    .trim()
    .regex(
      /^(?:\+8801|01)[3-9]\d{8}$/,
      "Please enter a valid Bangladeshi phone number",
    )
    .or(z.literal("")),

  address: z
    .string("Address must be a string")
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .max(255, "Address cannot exceed 255 characters"),
  resume: getCustomFileSchema<File | null>(
    `Resume must be a PDF, DOC, DOCX or an image file under ${MAX_FILE_SIZE}MB`,
  ).refine((value) => value instanceof File, {
    message: "A resume is required",
  }),
});
