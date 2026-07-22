import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is too short'),
  addressLine1: z.string().min(5, 'Address is too short'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  postcode: z.string().min(3, 'Postcode is required'),
  country: z.string().min(2, 'Country is required'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
