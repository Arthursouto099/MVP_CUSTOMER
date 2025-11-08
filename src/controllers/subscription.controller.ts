import { Request, Response, NextFunction } from "express";
import CustomerService from "../services/customer.service";
import Ok from "../utils/ok";
import SubscriptionService from "../services/subscription.service";
import preApproval from "../config/mercadopago.config"



const SubscriptioController = {
    CreateSubscription: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdService = await SubscriptionService.createSubscription(req.body)
            Ok(res, "Subscription created successfully", 201, createdService)
        }
        catch (e) {
            next(e)
        }
    },

    webhook: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type, data } = req.body
            if (type === "preapproval" && data.id) {
                const { status, date_created, last_modified, payer_id, auto_recurring, payer_email } = await preApproval.get({ id: data.id })
                const preApprovalData = { status: status, date_created: date_created, last_modified: last_modified, payer_id: payer_id, price: auto_recurring?.transaction_amount, payer_email: payer_email}
                await SubscriptionService.SubscriptioSave(preApprovalData)
            }
        }
        catch (e) {
            next(e)
        }
    }
}

export default SubscriptioController