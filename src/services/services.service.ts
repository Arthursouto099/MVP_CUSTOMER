import { Prisma } from "../../generated/prisma"
import prisma from "../client.prisma"
import ErrorHandler from "../errors/ErrorHandler"
import errorHandlerReturn from "../utils/errorHandlerReturn"



export class  ServiceError extends ErrorHandler {}


const ServicesService = {
    createService: async (data: Prisma.ServiceCreateInput) => {
        try {
            return await prisma.service.create({data})
        }
        catch(e) {
            throw errorHandlerReturn(e, ServiceError)
        }
    },


    findAllServices: async ({page = 1, limit = 10}: {page: number, limit: number}) => {
        try{
            const skip = (page - 1) * limit

            return await prisma.service.findMany({skip: skip, take: limit, orderBy: {checkInDate: 'desc'}, include: {customer: true}}) ?? []
        }
        catch(e) {
            throw errorHandlerReturn(e, ServiceError)
        }
    },


    updateService: async ({id_service, data} : {id_service: string, data: Prisma.ServiceUpdateInput}) => {
        try{
            return await prisma.service.update({where: {id_service}, data: data})

        }

        catch(e) {
            throw errorHandlerReturn(e, ServiceError)
        }
    },


    deleteService: async ({id_service}: {id_service: string}) => {
        try {
            return await prisma.service.delete({where: {id_service}})
        }   
        catch(e) {
            throw errorHandlerReturn(e, ServiceError)
        }
    }
}




export default ServicesService