import { Router } from "express";
import CustomerController from "../../controllers/customer.controller";
import validateSchema from "../../schemas/validateSchema";
import { CustomerSchema, CustomerUpdateSchema } from "../../schemas/customer.schema";
import authMiddleware from "../../middlewares/authMiddlewares";


const customerRouter: Router = Router()


customerRouter.post("/create", validateSchema(CustomerSchema), CustomerController.CreateCustomer)
customerRouter.get("/all", CustomerController.FindCustomers)
customerRouter.put("/update/:id_customer", validateSchema(CustomerUpdateSchema), CustomerController.UpdateCustomer)
customerRouter.post("/login", CustomerController.loginCustomer)
customerRouter.delete("/delete/:id_customer", CustomerController.DeleteCustomer)
customerRouter.get("/:id_customer", CustomerController.FindCustomerById)

export default customerRouter