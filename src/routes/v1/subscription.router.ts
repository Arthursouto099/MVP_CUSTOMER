import { Router } from "express";
import SubscriptioController from "../../controllers/subscription.controller";

const subscriptioRouter: Router = Router()

subscriptioRouter.post("/create", SubscriptioController.CreateSubscription)
subscriptioRouter.post("/webhook", SubscriptioController.webhook)

export default subscriptioRouter