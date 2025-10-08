import { Request, Response, NextFunction } from "express";
import CustomerService from "../services/customer.service";
import Ok from "../utils/ok";



const CustomerController = {
    CreateCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const createdCustomer = await CustomerService.createCustomer(req.body)
            Ok(res, "Customer created successfuly", 201, createdCustomer)
        }
        catch(e) {
            next(e)
        }
    },

    FindCustomers: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const isCustomers = await CustomerService.findAllCustomers({page: Number(req.query.page ?? 1), limit: Number(req.query.limit ?? 10)})
            Ok(res, "Customers finded", 200, isCustomers)
        }
        catch(e) {
            next(e)
        }
    }
}

export default CustomerController