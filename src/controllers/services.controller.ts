import { Request, Response, NextFunction } from "express";
import CustomerService from "../services/customer.service";
import Ok from "../utils/ok";
import ServicesService from "../services/services.service";




const ServiceController = {
    CreateService: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const createdService = await ServicesService.createService(req.body)
            Ok(res, "Service created successfully", 201, createdService)
        }
        catch(e) {
            next(e)
        }
    },

    FindServices: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const isServices = await ServicesService.findAllServices({page: Number(req.query.page ?? 1), limit: Number(req.query.limit ?? 10)})
            Ok(res, "Services finded", 200, isServices)
        }
        catch(e) {
            next(e)
        }
    },


    UpdateService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isUpdated = await ServicesService.updateService({id_service: req.params.id_service, data: req.body})
            Ok(res, "Customer updated successfully", 200, isUpdated)
        }
        catch(e) {
            next(e)
        }
    },

    DeleteService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isDeleted = await ServicesService.deleteService({id_service: req.params.id_service})
            Ok(res, "Customer deleted successfully", 200, isDeleted)
        }
        catch(e) {
            next(e)
        }
    }


}

export default ServiceController