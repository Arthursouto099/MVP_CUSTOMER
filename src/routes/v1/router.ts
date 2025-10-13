import { Router } from "express";
import customerRouter from "./customer.router";
import serviceRouter from "./service.router";
import vehicleRouter from "./vehicle.router";



const v1Router: Router = Router()


v1Router.use("/customer", customerRouter)
v1Router.use("/services", serviceRouter)
v1Router.use("/vehicles", vehicleRouter)

export default v1Router