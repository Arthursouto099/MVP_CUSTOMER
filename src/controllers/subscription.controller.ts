import { Request, Response, NextFunction } from "express";
import CustomerService from "../services/customer.service";
import Ok from "../utils/ok";
import SubscriptionService from "../services/subscription.service";
import preApproval from "../config/mercadopago.config"
import { subscribe } from "diagnostics_channel";



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
            console.log("webhook chamado")
           const subscription = await SubscriptionService.SubscriptioSave(req.body)
           Ok(res, "Subscription created successfully", 201, subscription)
        }
        catch (e) {
            next(e)
        }
    }
}

export default SubscriptioController