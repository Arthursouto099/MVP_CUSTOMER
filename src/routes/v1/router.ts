import { Router } from "express";
import customerRouter from "./customer.router";
import serviceRouter from "./service.router";



const v1Router: Router = Router()


v1Router.use("/customer", customerRouter)
v1Router.use("/services", serviceRouter)

export default v1Router