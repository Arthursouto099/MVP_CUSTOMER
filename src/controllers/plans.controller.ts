import { Request, Response, NextFunction } from "express";
import planService from "../services/plan.service";
import Ok from "../utils/ok";
import { is } from "zod/v4/locales";

const PlanController = {
    createPlan: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createPlan = await planService.createPlan(req.body)
            Ok(res, "PLano criado com sucesso", 201, createPlan)
        } catch (e) {
            next(e)
        }
    },

    findPlans: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isPlan = await planService.findAllplans({ page: Number(req.query.page ?? 1), limit: Number(req.query.limit ?? 10) })
            Ok(res, "Plan finded", 200, isPlan)
        } catch (e) {
            next(e)
        }
    },

    FindPlan: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isPlan = await planService.findAllPlan({ id_plan: req.params.id_plan })
            Ok(res, "plan finded", 200, isPlan)
        }
        catch (e) {
            next(e)
        }
    },

    UpdatePlan: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isUpdated = await planService.updateService({ id_plan: req.params.id_plan, data: req.body })
            Ok(res, "Customer updated successfully", 200, isUpdated)
        }
        catch (e) {
            next(e)
        }
    },

    DeleteService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isDeleted = await planService.deleteService({ id_plan: req.params.id_plan })
            Ok(res, "Customer deleted successfully", 200, isDeleted)
        }
        catch (e) {
            next(e)
        }
    }
}

export default PlanController