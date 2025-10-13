import { Router } from "express";
import CustomerController from "../../controllers/customer.controller";
import validateSchema from "../../schemas/validateSchema";
import { CustomerSchema, CustomerUpdateSchema } from "../../schemas/customer.schema";
import VehicleController from "../../controllers/vehicle.controller";
import authMiddleware from "../../middlewares/authMiddlewares";


const vehicleRouter: Router = Router()


vehicleRouter.post("/create", authMiddleware, VehicleController.CreateVehicle)
vehicleRouter.get("/all", authMiddleware, VehicleController.FindVehicles)
vehicleRouter.put("/update/:id_vehicle", VehicleController.UpdateVehicle)
vehicleRouter.delete("/delete/:id_vehicle", VehicleController.DeleteVehicle)
vehicleRouter.get("/:id_vehicle", VehicleController.FindVehicle)

export default vehicleRouter