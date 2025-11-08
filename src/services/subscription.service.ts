import { Prisma } from "../../generated/prisma"
import prisma from "../client.prisma"
import ErrorHandler from "../errors/ErrorHandler"
import errorHandlerReturn from "../utils/errorHandlerReturn"
import preApproval from "../config/mercadopago.config"

export class SubscriptionError extends ErrorHandler { }


const SubscriptionService = {
    createSubscription: async (data: Prisma.SubscriptionCreateInput) => {
        try {
           const response =  await preApproval.create({
                body: {
                    reason: data.name_plano,
                    payer_email: "test_user_5777718841264674073@testuser.com",
                    auto_recurring: {
                        frequency: 1,
                        frequency_type: 'months',
                        transaction_amount: Number(data.price),
                        currency_id: "BRL",
                    },
                    back_url: 'https://3bbcf7050a29.ngrok-free.app/assinatura-feita'
                }
            })
            return response;
        }
        catch (e) {
            throw errorHandlerReturn(e, SubscriptionError)
        }
    },

    SubscriptioSave: async (data: any) => {
        try {
            return await prisma.subscription.create({ data })
        } catch (e) {
            throw errorHandlerReturn(e, SubscriptionError)
        }

    }
}


export default SubscriptionService