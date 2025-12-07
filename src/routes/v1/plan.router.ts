import { Router } from "express";
import PlanController from "../../controllers/plans.controller";


const planRouter: Router = Router()

planRouter.post("/create", PlanController.createPlan)
planRouter.get("/all", PlanController.findPlans)
planRouter.get("/:id_plan", PlanController.FindPlan)
planRouter.put("/update/:id_plan", PlanController.UpdatePlan)
planRouter.delete("/delete/:id_plan", PlanController.DeleteService)

export default planRouter