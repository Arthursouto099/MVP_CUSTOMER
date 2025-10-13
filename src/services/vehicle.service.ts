import { Prisma } from "../../generated/prisma"
import prisma from "../client.prisma"
import ErrorHandler from "../errors/ErrorHandler"
import errorHandlerReturn from "../utils/errorHandlerReturn"



export class  VehicleError extends ErrorHandler {}


const VehicleService = {
    createVehicle: async (data: Prisma.VehicleCreateInput, {id_customer}: {id_customer:string}) => {
        try {
         
            return await prisma.vehicle.create({data: {
                ...data,
                customer: {
                    connect: {id_customer: id_customer}
                }
            }})
        }
        catch(e) {
            throw errorHandlerReturn(e, VehicleError)
        }
    },


    findAllVehicles: async ({page = 1, limit = 20, id_customer}: {page: number, limit: number, id_customer: string}) => {
        try{
            const skip = (page - 1) * limit

            return await prisma.vehicle.findMany({skip: skip, take: limit, orderBy: {createdAt: 'desc'}, where: {id_customer}}) ?? []
        }
        catch(e) {
            throw errorHandlerReturn(e, VehicleError)
        }
    },

     findVehicle: async ({id_vehicle}: {id_vehicle: string}) => {
        try{
            return await prisma.vehicle.findUnique({where: {id_vehicle}})
        }
        catch(e) {
            throw errorHandlerReturn(e, VehicleError)
        }
    },


    updateVehicle: async ({id_vehicle, data} : {id_vehicle: string, data: Prisma.VehicleUpdateInput}) => {
        try{
            return await prisma.vehicle.update({where: {id_vehicle}, data: data})

        }

        catch(e) {
            throw errorHandlerReturn(e, VehicleError)
        }
    },


    deleteVehicle: async ({id_vehicle}: {id_vehicle: string}) => {
        try {
            return await prisma.vehicle.delete({where: {id_vehicle}})
        }   
        catch(e) {
            throw errorHandlerReturn(e, VehicleError)
        }
    }
}




export default VehicleService