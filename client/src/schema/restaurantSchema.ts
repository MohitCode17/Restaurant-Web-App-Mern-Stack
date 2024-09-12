import { z } from "zod";

// RESTAURANT FORM SCHEMA
export const restaurantFormSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City name is required"),
  country: z.string().min(1, "Country name is required"),
  deliveryTime: z
    .number()
    .min(0, { message: "Delivery time cannot be negative." }),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});

export type RestaurantFormType = z.infer<typeof restaurantFormSchema>;
