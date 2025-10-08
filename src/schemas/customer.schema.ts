import z from "zod";



export const CustomerSchema = z.object({
    id_customer: z.uuid().optional(),
    name: z.string(),
    phone: z.string(),
    email: z.email(),
    password: z.string(),
    plate: z.string().optional()
})
