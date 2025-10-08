import { success, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";



export default function validateSchema(schema: ZodType<unknown>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body)
        if(!parsed.success) {
            const errs = parsed.error.issues.map(issue => issue.message)
            res.status(400).json({
                message: errs[0],
                errors: errs,
                success: false
            })
            return
        }

        next()
    }
}