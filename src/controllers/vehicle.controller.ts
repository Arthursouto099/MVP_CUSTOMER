import { Request, Response, NextFunction } from "express";

import Ok from "../utils/ok";
import VehicleService from "../services/vehicle.service";
import { RequestLogged } from "../types/RequestLogged";
import { CustomerError } from "../services/customer.service";



const VehicleController = {
    CreateVehicle: async (req: RequestLogged, res: Response, next: NextFunction) => {
        try{
            const vehicleCreated = await VehicleService.createVehicle(req.body, {id_customer: req.customer?.id_customer ?? ""})
            Ok(res, "Vehicle created successfully", 201, vehicleCreated)
        }
        catch(e) {
            next(e)
        }
    },

    FindVehicles: async (req: RequestLogged, res: Response, next: NextFunction) => {
        try{
            if(!req.customer?.id_customer) throw CustomerError.unauthorized()
            const isvehicles = await VehicleService.findAllVehicles({page: Number(req.query.page ?? 1), limit: Number(req.query.limit ?? 10), id_customer: req.customer?.id_customer})
            Ok(res, "Vehicles finded", 200, isvehicles)
        }
        catch(e) {
            
            next(e)
        }
    },

    FindVehicle: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const isVehicle = await VehicleService.findVehicle({id_vehicle: req.params.id_vehicle})
            Ok(res, "Vehicle finded", 200, isVehicle)
        }
        catch(e) {
            next(e)
        }
    },


    UpdateVehicle: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isVehicle = await VehicleService.updateVehicle({id_vehicle: req.params.id_vehicle, data: req.body})
            Ok(res, "Vehicle updated successfully", 200, isVehicle)
        }
        catch(e) {
            next(e)
        }
    },

    DeleteVehicle: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isDeleted = await VehicleService.deleteVehicle({id_vehicle: req.params.id_vehicle})
            Ok(res, "Vehicle deleted successfully", 200, isDeleted)
        }
        catch(e) {
            next(e)
        }
    }


}

export default VehicleController