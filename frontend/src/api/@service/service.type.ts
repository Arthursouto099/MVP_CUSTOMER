

export type Service = {
    name: string;
    description: string | null;
    updatedAt: Date;
    id_service: string;
    service_type: string;
    price: string;
    status: "PRONTO" | "EM_LAVAGEM" |"AGENDADO" | "CANCELADO" |"DESTRUIDO";
    checkOutDate: Date | null;
    checkInDate: Date;
    isPaid: boolean;
    customer_id: string;
}