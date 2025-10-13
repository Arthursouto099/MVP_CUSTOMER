

export type Service = {
    name: string;
    description: string | null;
    updatedAt: Date;
    id_service?: string;
    service_type: string;
    price: string;
    checkOutDate?: Date | null;
    createdAt?: Date
    type: "AVULSO" | "ASSINATURA"
    typePlan: "PRATA" | "OURO" | "BRONZE" | "AVULSO"
} 