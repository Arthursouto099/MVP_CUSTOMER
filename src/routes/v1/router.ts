import { Router } from "express";
import customerRouter from "./customer.router";
import serviceRouter from "./service.router";
import vehicleRouter from "./vehicle.router";
import subscriptioRouter from "./subscription.router";
import planRouter from "./plan.router";



const v1Router: Router = Router()


v1Router.use("/customer", customerRouter)
v1Router.use("/services", serviceRouter)
v1Router.use("/vehicles", vehicleRouter)
v1Router.use("/subscription", subscriptioRouter)
v1Router.use("/plan", planRouter)

export default v1Router