import z from "zod";
// import { Decimal } from "../../generated/prisma/runtime/library";




export const CustomerSchema = z.object({
    id_customer: z.uuid().optional(),
    name: z.string(),
    phone: z.string(),
    email: z.email(),
    plan: z.enum(["BRONZE", "PRATA", "OURO"]).optional(),
    priority: z.enum(["VIP", "REGULAR", "NOVO"]).optional(),
    obs: z.string().optional(),
    password: z.string(),
})



export const CustomerUpdateSchema = CustomerSchema.partial()