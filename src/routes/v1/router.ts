import { Router } from "express";
import customerRouter from "./customer.router";



const v1Router: Router = Router()


v1Router.use("/customer", customerRouter)

export default v1Router