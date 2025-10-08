import { Router } from "express";
import CustomerController from "../../controllers/customer.controller";
import validateSchema from "../../schemas/validateSchema";
import { CustomerSchema } from "../../schemas/customer.schema";


const customerRouter: Router = Router()


customerRouter.post("/create", validateSchema(CustomerSchema), CustomerController.CreateCustomer)
customerRouter.get("/all", CustomerController.FindCustomers)

export default customerRouter