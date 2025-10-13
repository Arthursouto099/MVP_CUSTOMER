import { Request, Response, NextFunction } from "express";
import CustomerService from "../services/customer.service";
import Ok from "../utils/ok";
import jwt from "jsonwebtoken"
import "dotenv/config"


const CustomerController = {
    CreateCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdCustomer = await CustomerService.createCustomer(req.body)
            Ok(res, "Customer created successfully", 201, createdCustomer)
        }
        catch (e) {
            next(e)
        }
    },


    loginCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isLogin = await CustomerService.loginCustomer(req.body);

            if (!isLogin.success) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const token = jwt.sign(
                { data: isLogin.data },
                process.env.JWT_SECRET ?? "secret_default",
                { expiresIn: "6h" } 
            );

            Ok(res, "Login feito com sucesso", 200, { token });
        } catch (e) {
            next(e);
        }
    },

    FindCustomerById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customer = await CustomerService.findCustomerById({ id_customer: req.params.id_customer })
            Ok(res, "Customer finded successfully", 200, customer)
        }
        catch (e) {
            next(e)
        }


    },

    FindCustomers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isCustomers = await CustomerService.findAllCustomers({ page: Number(req.query.page ?? 1), limit: Number(req.query.limit ?? 10) })
            Ok(res, "Customers finded", 200, isCustomers)
        }
        catch (e) {
            next(e)
        }
    },


    UpdateCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isUpdated = await CustomerService.updateCustomer({ id_customer: req.params.id_customer, data: req.body })
            Ok(res, "Customer updated successfully", 200, isUpdated)
        }
        catch (e) {
            next(e)
        }
    },

    DeleteCustomer: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isDeleted = await CustomerService.deleteCustomer({ id_customer: req.params.id_customer })
            Ok(res, "Customer deleted successfully", 200, isDeleted)
        }
        catch (e) {
            next(e)
        }
    }


}

export default CustomerController

