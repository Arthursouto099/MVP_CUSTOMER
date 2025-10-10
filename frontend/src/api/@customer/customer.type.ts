



export type Customer = {
    name: string;
    id_customer?: string;
    phone: string;
    email: string;
    password: string;
    updatedAt?: Date;
    createdAt?: Date;
    frequent?: boolean
    priority?: "VIP" | "REGULAR" | "NOVO"
    plan?: "BRONZE" | "PRATA" | "OURO"
    obs?: string
} 


