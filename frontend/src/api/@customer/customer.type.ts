import type { Service } from "../@service/service.type";



export type Customer = {
    name: string;
    id_customer?: string;
    phone: string;
    email: string;
    password: string;
    plate: string;
    car_model: string;
    updatedAt?: Date;
    createdAt?: Date;
    frequent?: boolean
    priority?: "VIP" | "REGULAR" | "NOVP"
    services: Service[]
} 


