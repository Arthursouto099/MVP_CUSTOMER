import z from "zod";
// import { Decimal } from "../../generated/prisma/runtime/library";




export const CustomerSchema = z.object({
    id_customer: z.uuid().optional(),
    name: z.string(),
    phone: z.string(),
    email: z.email(),
    password: z.string(),
    plate: z.string(),
    car_model: z.string()
})



export const CustomerUpdateSchema = CustomerSchema.partial()