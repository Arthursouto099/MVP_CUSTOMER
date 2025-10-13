import { email, string } from "zod";
import { Customer, Prisma } from "../../generated/prisma";
import prisma from "../client.prisma";
import ErrorHandler from "../errors/ErrorHandler";
import errorHandlerReturn from "../utils/errorHandlerReturn";


export class  CustomerError extends ErrorHandler {}


const CustomerService = {
    createCustomer: async (data: Prisma.CustomerCreateInput) => {
        try {
            return await prisma.customer.create({data})
        }
        catch(e) {
            throw errorHandlerReturn(e, CustomerError)
        }
    },

    loginCustomer: async ({email, password}: {email: string, password: string}): Promise<{success: boolean, data: Customer | null}> => {
        try {
            const customer = await prisma.customer.findFirst({where: {
                AND: [
                    {email},
                    {password}
                ]
            }})

            if(!customer) throw CustomerError.notFound()

            return {
                data: customer,
                success: true
            }
        } 
        catch(e) {
            return {
                data: null,
                success: false
            }
        } 
    },



    findCustomerById: async ({id_customer}: {id_customer: string}) => {
        try {
            return await prisma.customer.findUnique({where: {id_customer}, include: {vehicles: true}}) 
        }

        catch(e) {
            throw errorHandlerReturn(e, CustomerError)
        }

    },


    findAllCustomers: async ({page = 1, limit = 10}: {page: number, limit: number}) => {
        try{
            const skip = (page - 1) * limit

            return await prisma.customer.findMany({skip: skip, take: limit, orderBy: {createdAt: 'desc'}, include: {vehicles: true}} ) ?? []
        }
        catch(e) {
            throw errorHandlerReturn(e, CustomerError)
        }
    },


    updateCustomer: async ({id_customer, data} : {id_customer: string, data: Prisma.CustomerUpdateInput }) => {
        try{
            return await prisma.customer.update({where: {id_customer}, data: data})

        }

        catch(e) {
            throw errorHandlerReturn(e, CustomerError)
        }
    },


    deleteCustomer: async ({id_customer}: {id_customer: string}) => {
        try {
            return await prisma.customer.delete({where: {id_customer}})
        }   
        catch(e) {
            throw errorHandlerReturn(e, CustomerError)
        }
    }
}


export default CustomerService