
export type Vehicle =   {
    id_vehicle?: string | undefined;
    type: "CARRO" | "MOTO" | "CAMINHAO" | "OUTRO"
    model: string;
    plate: string;
    year: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}