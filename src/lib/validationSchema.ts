import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().trim().min(3, "Name is required"),
  price: z.number().positive("Price must be greater than 0"),
  image: z.string().url("invalid image URL"),
  categoryId: z.number().int().positive(),
  available: z.boolean(),
});

export const updateMenuItemSchema = menuItemSchema.partial();

export const createOrderSchema = z.object({
  tableNumber: z.number().int().positive(),
  note: z.string(),

  items: z
    .array(
      z.object({
        menuItemId: z.number().int().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "order must contain at least one item"),
});

export const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "COOKING", "READY", "COMPLETED"]).optional(),

  paymentStatus: z.enum(["UNPAID", "PAID"]).optional(),

  tableNumber: z.number().int().positive().optional(),

  note: z.string().optional(),

  items: z
    .array(
      z.object({
        menuItemId: z.number().int().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .optional(),
});

const userSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email("invlid email"),
  password: z.string(),
});

export const signupSchema = userSchema;

export const createUserSchema = userSchema.extend({
  role: z.enum(["ADMIN", "STAFF", "KITCHEN", "CASHIER"]),
});
