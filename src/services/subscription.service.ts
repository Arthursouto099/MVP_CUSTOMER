import { Prisma } from "../../generated/prisma"
import prisma from "../client.prisma"
import ErrorHandler from "../errors/ErrorHandler"
import errorHandlerReturn from "../utils/errorHandlerReturn"
import preApproval from "../config/mercadopago.config"
import 'dotenv'

export class SubscriptionError extends ErrorHandler { }


const SubscriptionService = {
    createSubscription: async (data: Prisma.SubscriptionCreateInput) => {
        try {
            const response = await preApproval.create({
                body: {
                    reason: data.name_plano,
                    payer_email: "test_user_5777718841264674073@testuser.com",
                    auto_recurring: {
                        frequency: 1,
                        frequency_type: 'months',
                        transaction_amount: Number(data.price),
                        currency_id: "BRL",
                    },
                    back_url: `${process.env.NGROK_URL}/assinatura-feita`
                }
            })
            return response;
        }
        catch (e) {
            throw errorHandlerReturn(e, SubscriptionError)
        }
    },

    SubscriptioSave: async (dataSub: any) => {
        try {
            console.log("try")
            const { type, data } = dataSub
            let preApprovalData: Prisma.SubscriptionCreateInput
            console.log(type)
            if (type === "subscription_preapproval" && data.id) {
                console.log("if")
                const subdata = await preApproval.get({ id: data.id })
                // preApprovalData = { status: status, date_created: date_created, last_modified: last_modified, payer_id: payer_id, price: auto_recurring?.transaction_amount || 0, payer_email: payer_email }
                preApprovalData = { id_plan: "erro", id_mpPreapprovalId: subdata.id || "Erro ao pegar id", price: subdata.auto_recurring?.transaction_amount || 10, Status_subscription: subdata.status || "erro ao pegar o status", createdAt: subdata.date_created, updatedAt: subdata.last_modified, name_plano: subdata.reason || "erro" }
            } else {
                return
            }
            return await prisma.subscription.create({ data: preApprovalData })
        } catch (e) {
            throw errorHandlerReturn(e, SubscriptionError)
        }

    }
}


export default SubscriptionService