import { Router } from "express";
import CustomerController from "../../controllers/customer.controller";


const customerRouter: Router = Router()


// ainda falta a validação dos dados
customerRouter.post("/create", CustomerController.CreateCustomer)


export default customerRouter