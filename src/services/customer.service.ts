import { Prisma } from "../../generated/prisma";
import prisma from "../client.prisma";
import ErrorHandler from "../errors/ErrorHandler";
import errorHandlerReturn from "../utils/errorHandlerReturn";


class  CustomerError extends ErrorHandler {}


const CustomerService = {
    createCustomer: async (data: Prisma.CustomerCreateInput) => {
        try {
            return await prisma.customer.create({data})
        }
        catch(e) {
            throw errorHandlerReturn(e, CustomerError)
        }
    }
}


export default CustomerService