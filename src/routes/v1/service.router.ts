import { Router } from "express";
import ServiceController from "../../controllers/services.controller";
import validateSchema from "../../schemas/validateSchema";
import { ServiceSchema, ServiceUpdateSchema } from "../../schemas/service.schema";



const serviceRouter: Router = Router()

serviceRouter.post("/create", validateSchema(ServiceSchema), ServiceController.CreateService)
serviceRouter.get("/all", ServiceController.FindServices)
serviceRouter.put("/update/:id_service", validateSchema(ServiceUpdateSchema), ServiceController.UpdateService)
serviceRouter.delete("/delete/:id_service", ServiceController.DeleteService)

export default serviceRouter