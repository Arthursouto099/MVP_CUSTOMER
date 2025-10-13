import { Request } from "express"
import { Customer } from "../../generated/prisma"

export type RequestLogged  = Request  & {
    customer?: Customer
}