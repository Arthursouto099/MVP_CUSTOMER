import { Prisma, Plano } from "../../generated/prisma";
import prisma from "../client.prisma";



const planService = {
    createPlan: async (data: Prisma.PlanoCreateInput) => {
        try {
            return await prisma.plano.create({ data })
        } catch (e) {
            throw new Error("houve um erro ao criar plano: " + e)
        }
    },

    findAllplans: async ({ page = 1, limit = 10 }: { page: number, limit: number }) => {
        try {
            const skip = (page - 1) * limit

            return await prisma.plano.findMany({ skip: skip, take: limit, orderBy: { price: 'desc' } }) ?? []
        }
        catch (e) {
            throw new Error("houve um erro ao buscar planos: " + e)
        }
    },

    findAllPlan: async ({ id_plan }: { id_plan: string }) => {
        try {
            return await prisma.plano.findUnique({ where: { id_plan } })
        }
        catch (e) {
            throw new Error("houve um erro ao buscar plano: " + e)
        }
    },

    updateService: async ({ id_plan, data }: { id_plan: string, data: Prisma.ServiceUpdateInput }) => {
        try {
            return await prisma.plano.update({ where: { id_plan }, data: data })

        }

        catch (e) {
            throw new Error("houve um erro ao atualizar plano: " + e)
        }
    },

    deleteService: async ({ id_plan }: { id_plan: string }) => {
        try {
            return await prisma.plano.delete({ where: { id_plan } })
        }
        catch (e) {
            throw new Error("houve um erro ao deletar plano: " + e)
        }
    }

}

export default planService