import z from "zod"





export const ServiceSchema = z.object({
  id_service: z.uuid().optional(), // gerado automaticamente pelo banco
  customer_id: z.uuid(),
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().optional(),
  service_type: z.string().min(1, "O tipo de serviço é obrigatório"),
  price: z.union([z.number(),z.string().regex(/^\d+(\.\d{1,2})?$/, "Preço deve ser um número válido"),]),
  status: z
    .enum(["PRONTO", "EM_LAVAGEM", "AGENDADO", "CANCELADO", "DESTRUIDO"])
    .optional()
    .default("AGENDADO"),
  checkOutDate: z.coerce.date().optional(),
  isPaid: z.boolean().default(false),
});


export const ServiceUpdateSchema = ServiceSchema.partial()